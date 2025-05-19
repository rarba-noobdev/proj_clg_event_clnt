/**
 * User State Management Module
 * --------------------------
 * Provides centralized state management for user authentication and session handling
 * using Svelte's context API and Supabase authentication.
 *
 * Features:
 * - Reactive state management for user session and events
 * - Supabase client integration with type-safe database interactions
 * - Authentication state persistence
 * - Real-time updates for the events table
 * - Comprehensive error handling
 *
 * Usage:
 * ```typescript
 * // In a component
 * import { getUserState } from '$lib/userstate.svelte';
 *
 * let { user, session, events } = $derived(getUserState());
 * ```
 *
 * State Structure:
 * - session: Current user session
 * - user: Current user data
 * - supabase: Supabase client instance
 * - events: Cached events data
 *
 * @module userstate
 */

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';
import type { Database } from '$lib/types/database.types.js';

// Define the EventTable type from the Database schema
export type EventTable = Database['public']['Tables']['events']['Row'];

// Define a type for the Supabase client with specific database type
type TypedSupabaseClient = SupabaseClient<Database>;

/**
 * Interface representing the user state data structure
 * @interface UserStateObject
 */
interface UserStateObject {
  /** Current user session or null if not authenticated */
  session: Session | null;
  /** Current user data or null if not authenticated */
  user: User | null;
  /** Initialized Supabase client instance */
  supabase: TypedSupabaseClient | null;
  /** Optional initial cached events data */
  events?: EventTable[];
}

/**
 * Class managing global user state and authentication
 * @class UserState
 */
export class UserState {
  /** @private Current user session state */
  private _session = $state<Session | null>(null);
  /** @private Current user data state */
  private _user = $state<User | null>(null);
  /** @private Supabase client instance */
  private _supabase = $state<TypedSupabaseClient | null>(null);
  /** @private Cached events data */
  private _events = $state<EventTable[]>([]);
  /** @private Supabase channel for real-time updates */
  private _channel: any = null;

  /**
   * Creates a new UserState instance
   * @param userState Initial user state object
   */
  constructor(userState: UserStateObject) {
    this.updateState(userState);
  }

  /**
   * Updates the current user state
   * @param userState Partial user state object to update
   */
  updateState(userState: Partial<UserStateObject>): void {
    if (userState.session !== undefined) {
      this._session = userState.session;
    }
    if (userState.user !== undefined) {
      this._user = userState.user;
    }
    if (userState.supabase !== undefined) {
      this._supabase = userState.supabase;
      // Setup or cleanup real-time subscription based on supabase availability
      if (this._supabase) {
        this.setupRealtimeSubscription();
      } else {
        this.cleanupSubscription();
      }
    }
    if (userState.events !== undefined) {
      this._events = userState.events ?? [];
    }
  }

  /**
   * Sets up real-time subscription for events table
   * @private
   */
  private setupRealtimeSubscription(): void {
    if (!this._supabase) {
      console.error('Cannot setup subscription: Supabase client not initialized');
      return;
    }

    // Clean up existing subscription if any
    this.cleanupSubscription();

    const channel = this._supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events', // Specify the events table explicitly
        },
        (payload) => {
          console.log('Change received!', payload);
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            this.updateEventsFromPayload(payload);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to events changes');
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          console.error('Subscription failed or closed:', status);
        }
      });

    // Store the channel for cleanup
    this._channel = channel;
  }

  /**
   * Updates cached events based on real-time payload
   * @private
   */
  private updateEventsFromPayload(payload: any): void {

    const newEvent = payload.new as EventTable;
    const oldEvent = payload.old as Partial<EventTable>;

    if (payload.eventType === 'INSERT') {
      this._events = [...this._events, newEvent];
    } else if (payload.eventType === 'UPDATE') {
      this._events = this._events.map((event) =>
        event.id === newEvent.id ? newEvent : event
      );
    } else if (payload.eventType === 'DELETE') {
      this._events = this._events.filter((event) => event.id !== oldEvent.id);
    }
  }

  /**
   * Cleans up the real-time subscription
   * @private
   */
  private cleanupSubscription(): void {
    if (this._channel) {
      this._supabase?.removeChannel(this._channel);
      this._channel = null;
    }
  }

  /**
   * Gets the current session
   * @returns Current session or null
   */
  get session(): Session | null {
    return this._session;
  }

  /**
   * Gets the current user
   * @returns Current user or null
   */
  get user(): User | null {
    return this._user;
  }

  /**
   * Gets the Supabase client
   * @returns Supabase client or null
   */
  get supabase(): TypedSupabaseClient | null {
    return this._supabase;
  }

  /**
   * Gets the cached events
   * @returns Array of events
   */
  get events(): EventTable[] {
    return this._events;
  }

  /**
   * Fetches events from Supabase
   * @throws Error if Supabase client is not initialized or query fails
   * @returns Promise resolving to array of events
   */
  async getEvents(): Promise<EventTable[]> {
    if (!this._supabase) {
      throw new Error('Supabase client not initialized');
    }

    const { data, error } = await this._supabase
      .from('events')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }

    this._events = data ?? [];
    return this._events;
  }

  /**
   * Logs out the current user
   * @throws Error if Supabase client is not initialized
   * @returns Promise resolving when logout is complete
   */
  async logOut(): Promise<void> {
    if (!this._supabase) {
      throw new Error('Supabase client not initialized');
    }

    const { error } = await this._supabase.auth.signOut();
    if (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }

    // Clean up subscription
    this.cleanupSubscription();

    // Reset state after logout
    this.updateState({
      session: null,
      user: null,
      events: [],
    });
  }
}

// Context key for type-safe context access
const USER_STATE_KEY = Symbol('userStateKey');

/**
 * Sets the user state context
 * @param userState Initial user state object
 * @returns UserState instance
 */
export const setUserState = (userState: UserStateObject): UserState => {
  const state = new UserState(userState);
  setContext(USER_STATE_KEY, state);
  return state;
};

/**
 * Gets the user state from context
 * @throws Error if user state context is not found
 * @returns UserState instance
 */
export const getUserState = (): UserState => {
  const userState = getContext<UserState>(USER_STATE_KEY);
  if (!(userState instanceof UserState)) {
    throw new Error('UserState context not found or invalid');
  }
  return userState;
};