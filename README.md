# Events Client Application

A modern web application for managing and exploring events, built with SvelteKit and Supabase. This application provides a seamless experience for users to browse, register, and manage events with a beautiful and responsive interface.

## Features

- 🎫 Event Exploration: Browse and search through various events
- 👤 User Authentication: Secure login and registration system using Supabase Auth
- 🎯 Event Details: Comprehensive event information including dates, location, and availability
- 🎨 Modern UI: Beautiful and responsive design with Tailwind CSS
- 🔐 Protected Routes: Secure access control for authenticated users
- 🔄 Real-time Updates: Live updates for event availability and bookings
- 📱 Mobile Responsive: Optimized for all device sizes
- 🌐 SSR Support: Server-side rendering for better SEO and performance

## Tech Stack

- **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Authentication**: Supabase Auth
- **Package Manager**: npm
- **Development Environment**: Vite
- **Type Safety**: TypeScript
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel

## Project Structure

```
src/
├── app.css                 # Global styles
├── app.d.ts               # TypeScript declarations
├── app.html              # HTML template
├── hooks.server.ts       # Server-side hooks
├── lib/                  # Shared library code
│   ├── components/       # Reusable components
│   │   ├── EventCard.svelte   # Event display component
│   │   ├── Header.svelte      # Navigation header
│   │   └── Icon.svelte        # Icon component
│   ├── types/           # TypeScript type definitions
│   │   └── database.types.ts  # Supabase database types
│   └── userstate.svelte.ts    # User state management
├── routes/              # Application routes
│   ├── +layout.server.ts      # Root server layout
│   ├── +layout.svelte         # Root layout component
│   ├── +layout.ts            # Root client layout
│   ├── +page.svelte          # Home page
│   ├── auth/                 # Authentication routes
│   │   ├── +page.server.ts   # Auth server logic
│   │   ├── +page.svelte      # Login form
│   │   └── error/            # Auth error handling
│   │       ├── +page.svelte  # Error display
│   │       ├── +page.ts      # Error page logic
│   │       └── [error_msg]/  # Dynamic error routes
│   └── explore/             # Content exploration
│       ├── events/          # Event management
│       │   ├── +layout.ts   # Event data loading
│       │   ├── +page.svelte # Events listing
│       │   └── [event_id]/  # Individual event routes
│       └── organizations/   # Organization management
│           └── +page.svelte # Organizations listing
└── supabase/           # Supabase configuration
    └── config.toml     # Supabase settings
```

## Architecture

### Authentication Flow

1. Users log in using their registration number (RRN) and password
2. Supabase handles authentication and session management
3. Protected routes check for valid session using hooks
4. Real-time session updates using Supabase's onAuthStateChange

### Error Handling

- Centralized error handling through dedicated error routes
- Custom error pages for different error types
- Dynamic error message routing
- Graceful fallbacks for failed operations
- Comprehensive error logging and reporting

### Organization Management

- View and manage organization details
- Organization-specific event management
- Role-based access control for organization members
- Organization analytics and reporting

### Routing Structure

- Root layout provides base page structure and authentication state
- Nested layouts for feature-specific content
- Dynamic routes for events and error messages
- Protected routes with authentication checks
- Client-side navigation with prefetching

### State Management

- Uses Svelte's built-in stores for local state
- Supabase real-time subscriptions for remote state
- Server-side rendering with hydration for optimal performance

### Data Flow

1. Server-side data loading through layout/page load functions
2. Client-side state management using Svelte stores
3. Real-time updates through Supabase subscriptions
4. Optimistic UI updates with fallback handling
5. Form handling with server actions

## Components

### EventCard

Displays event information including:

- Event name and description
- Date and time
- Location
- Price
- Available slots
- Food/OD availability badges
- Registration progress
- Dynamic color theming
- Responsive layout adaptation

### Header

Navigation component with:

- Brand logo and navigation
- User authentication status
- Dynamic navigation links
- User profile management
- Mobile-responsive menu

### Event Detail Page (`[event_id]/+page.svelte`)

The event detail page provides a comprehensive view of an individual event with:

#### Features

- Real-time updates for event data
- Dynamic availability status
- Interactive registration process
- Responsive layout with grid system
- Accessibility support with ARIA attributes
- Error handling and retry mechanisms
- Loading states and animations

#### Sections

1. **Hero Section**

   - Event title and status badges
   - Department/category tags
   - Host organization information

2. **Key Details Cards**

   - Date and time information
   - Location details
   - Availability status
   - Visual progress indicator

3. **Features Grid**

   - Certificate availability
   - Food provision status
   - OD (On Duty) status
   - Dynamic feature icons

4. **Registration Card**
   - Price information
   - Available spots
   - Dynamic registration button
   - Last update timestamp

#### Real-time Updates

The page implements Supabase real-time subscriptions:

```typescript
const channel = supabase.channel('events-realtime');
channel
	.on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, (payload) => {
		// Handle event updates
	})
	.subscribe();
```

#### State Management

- Local state using Svelte's `$state`
- Derived state with `$derived`
- Asynchronous data handling
- Error state management
- Loading state indicators

#### Authentication Integration

- User state awareness
- Conditional registration button
- Protected registration flow
- Login requirement handling

## Component Organization

### Core Components

Components in `src/lib/components` are organized by functionality:

#### UI Components

- `Icon.svelte`: Reusable icon component with dynamic SVG loading
- `Header.svelte`: Main navigation header with responsive design
- `EventCard.svelte`: Card component for event display

#### Layout Components

- Root layout (`+layout.svelte`): Base page structure
- Error layouts: Custom error page templates
- Feature-specific layouts: Event and organization layouts

### Component Design Principles

1. Single Responsibility: Each component has a focused purpose
2. Prop Validation: TypeScript interfaces for component props
3. Event Handling: Standardized event dispatching
4. Accessibility: ARIA attributes and keyboard navigation
5. Responsive Design: Mobile-first approach

## Development

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create a `.env` file with:

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Environment Setup

#### Development

```bash
# .env.development
PUBLIC_SUPABASE_URL=your_dev_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
PUBLIC_APP_URL=http://localhost:5173
```

#### Production

```bash
# .env.production
PUBLIC_SUPABASE_URL=your_prod_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
PUBLIC_APP_URL=https://your-domain.com
```

### Environment Variables

- `PUBLIC_SUPABASE_URL`: Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `PUBLIC_APP_URL`: Application URL for redirects

3. Start development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## TypeScript Support

The project uses TypeScript for type safety. Key types include:

- Database types from Supabase
- Route types generated by SvelteKit
- Component prop types
- State management types

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run check`: Type-check the project
- `npm run lint`: Run ESLint and Prettier checks
- `npm run format`: Format code with Prettier

## Database Schema

### Events Table

- `id`: Unique identifier (UUID)
- `name`: Event name (String)
- `description`: Event description (Text)
- `start_date`: Start date (Timestamp)
- `end_date`: End date (Timestamp)
- `time`: Event time (Time)
- `location`: Event location (String)
- `price`: Event price (Decimal)
- `max_slots`: Maximum participants (Integer)
- `booked_slots`: Current bookings (Integer)
- `food_provided`: Food availability flag (Boolean)
- `od_provided`: OD availability flag (Boolean)
- `is_sold_out`: Sold out status (Boolean)
- `color`: Theme color for UI (String)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Organizations Table

- `id`: Unique identifier (UUID)
- `name`: Organization name (String)
- `description`: Organization description (Text)
- `logo_url`: Organization logo URL (String)
- `website`: Organization website (String)
- `email`: Contact email (String)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### User Roles Table

- `id`: Unique identifier (UUID)
- `user_id`: Reference to auth.users
- `organization_id`: Reference to organizations
- `role`: Role type (enum: 'admin', 'member', 'guest')
- `created_at`: Creation timestamp

## Technical Implementation

### TypeScript Integration

```typescript
// Event type definition
type EventTable = {
	id: string;
	name: string;
	description: string;
	start_date: string;
	end_date: string;
	time: string;
	location: string;
	price: number;
	max_slots: number;
	booked_slots: number;
	food_provided: boolean;
	od_provided: boolean;
	is_sold_out: boolean;
	color: string;
	department?: string;
	managed_by?: string;
	certificate_provided?: boolean;
	created_at: string;
	updated_at: string;
};
```

### State Management Implementation

```typescript
// Reactive state declarations
let eventData: EventTable | null = $state(null);
let error: string | null = $state(null);
let loading: boolean = $state(true);
let isRetrying: boolean = $state(false);
```

### Component Architecture

1. **Smart Components**
   - Event detail page
   - Registration form
   - Event list
2. **Presentational Components**

   - Feature badges
   - Loading spinners
   - Error messages
   - Progress bars

3. **Layout Components**
   - Grid system
   - Card layouts
   - Responsive containers

### UI/UX Features

1. **Loading States**
   - Skeleton loaders
   - Spinner animations
   - Progress indicators
2. **Error Handling**
   - Error boundaries
   - Retry mechanisms
   - User feedback
3. **Animations**

   - Smooth transitions
   - Loading animations
   - Progress updates

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Focus management

### Data Flow Architecture

1. **Server-side**
   - Initial data loading
   - Authentication checks
   - Route parameters
2. **Client-side**
   - State management
   - Real-time updates
   - User interactions
3. **Database**
   - Event records
   - User registrations
   - Real-time subscriptions

### Performance Considerations

1. **Code Splitting**
   - Dynamic imports
   - Lazy loading
   - Component chunking
2. **State Management**
   - Efficient updates
   - Minimal rerenders
   - Cached data
3. **Network**
   - Real-time connections
   - Data caching
   - Error recovery

## Performance Considerations

- Implements code splitting for optimal bundle size
- Uses image optimization techniques
- Implements proper caching strategies
- SSR for initial page load performance
- Lazy loading for images and components
- Debounced search and filters

## Security Features

- CSRF protection
- XSS prevention
- Input validation
- Rate limiting
- Secure session management
- Environment variable protection

## State Management

### User State

- Centralized user state management
- Real-time session tracking
- Authentication status updates
- User preference persistence

### Event State

- Real-time event data synchronization
- Optimistic UI updates
- Cache management
- Error state handling
- Loading state management

### Data Flow

1. Initial server-side data load
2. Client-side state hydration
3. Real-time update subscription
4. State synchronization
5. UI updates

## Real-time Features

### Event Updates

- Live booking count updates
- Dynamic availability status
- Automatic sold-out detection
- Price and detail changes

### User Interactions

- Registration status updates
- Booking confirmation
- Error notifications
- Session management

### Performance Optimizations

- Debounced updates
- Optimistic UI changes
- Smart rerendering
- Connection management

## Authentication System

### Architecture Overview
The authentication system is built on top of Supabase Auth with a custom implementation for the university's registration number (RRN) system.

#### Authentication Flow
1. **Registration**
   - User enters RRN (Registration Number)
   - Selects course from predefined list
   - Creates password
   - System constructs email from RRN (`${rrn}@crescent.education`)
   - Account created in Supabase Auth

2. **Login**
   - User enters RRN
   - Enters password
   - System maps RRN to email format
   - Authenticates against Supabase

3. **Session Management**
   - Sessions handled by Supabase
   - Client-side state management via `UserState`
   - Real-time session updates
   - Automatic session refresh

### Components

#### Registration Page (`/auth/register/+page.svelte`)
```typescript
interface RegistrationForm {
  rrn: string;
  course: string;
  password: string;
  confirmPassword: string;
}
```

Features:
- RRN validation
- Course selection dropdown
- Password strength requirements
- Form validation
- Error handling
- Responsive design

#### Login Page (`/auth/+page.svelte`)
- RRN input
- Password input
- Error messaging
- Session handling
- Redirect management

### State Management

#### UserState Class
```typescript
class UserState {
  private _session: Session | null;
  private _user: User | null;
  private _supabase: SupabaseClient | null;

  constructor(userState: userStateObject);
  updateState(userState: userStateObject): void;
  logOut(): Promise<void>;
}
```

Features:
- Centralized state management
- Type-safe implementations
- Real-time state updates
- Session persistence
- Automatic cleanup

### Security Features

1. **Input Validation**
   - RRN format validation
   - Password strength requirements
   - Course validation
   - CSRF protection

2. **Session Security**
   - Secure session storage
   - Automatic token refresh
   - Session invalidation
   - XSS protection

3. **Route Protection**
   - Authentication guards
   - Role-based access
   - Secure redirects
   - Error boundaries

### Error Handling

1. **Authentication Errors**
   - Invalid credentials
   - Network failures
   - Session expiration
   - Server errors

2. **Form Validation**
   - Input validation
   - Password mismatch
   - Required fields
   - Format validation

3. **User Feedback**
   - Error messages
   - Loading states
   - Success notifications
   - Redirect notifications

### Integration Points

1. **Backend Integration**
```typescript
// Supabase Auth Integration
const { error } = await supabase.auth.signInWithPassword({
  email: `${rrn}@crescent.education`,
  password
});
```

2. **Route Handling**
```typescript
// Protected route handler
export const load: PageLoad = async ({ parent }) => {
  const { session } = await parent();
  if (!session) {
    throw redirect(303, '/auth/login');
  }
  return {};
};
```

3. **State Updates**
```typescript
// Real-time session updates
$effect(() => {
  const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
    userState.updateState({
      session: newSession,
      user: newSession?.user || null
    });
  });
});
```

### Testing Considerations

1. **Unit Tests**
- Authentication functions
- State management
- Form validation
- Error handling

2. **Integration Tests**
- Login flow
- Registration flow
- Session management
- Error scenarios

3. **E2E Tests**
- Complete user journeys
- Cross-browser testing
- Mobile responsiveness
- Error recovery

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Deployment

The application is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy with `git push`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Data Models

### User Authentication

#### User Profile
```typescript
interface UserProfile {
  id: string;
  rrn: string;              // Registration Number
  course: string;           // Selected course
  email: string;           // Constructed from RRN
  created_at: string;
  updated_at: string;
}
```

#### Course Types
```typescript
type CourseType =
  | 'btech-civil'
  | 'btech-mechanical'
  | 'btech-automobile'
  | 'btech-aeronautical'
  | 'btech-polymer'
  | 'btech-eee'
  | 'btech-ece'
  | 'btech-ecpe'
  | 'btech-eie'
  | 'btech-ai-ds'
  | 'btech-cse'
  | 'btech-cybersecurity'
  | 'btech-iot'
  | 'btech-it'
  | 'btech-biotech'
  | 'btech-lateral'
  | 'barch'
  | 'bdes'
  | 'bpharm'
  | 'bba-llb'
  | 'ba-llb'
  | 'bsc-aviation'
  | 'bsc-biotech'
  | 'bsc-cs'
  | 'bca'
  | 'bcom-general'
  | 'bcom-af'
  | 'bcom-pa'
  | 'bcom-iaf'
  | 'bba-general'
  | 'ba-policy'
  | 'ba-english'
  | 'ba-islamic';
```

### Form Validation

#### Registration Validation
```typescript
interface RegistrationValidation {
  rrn: {
    pattern: RegExp;         // /^[0-9]+$/
    minLength: number;       // Minimum RRN length
    maxLength: number;       // Maximum RRN length
    required: true;
  };
  password: {
    minLength: number;       // Minimum password length
    requireSpecial: boolean; // Require special characters
    requireNumber: boolean;  // Require numbers
    requireUpper: boolean;   // Require uppercase letters
  };
  course: {
    type: CourseType;       // Must be valid course type
    required: true;
  };
}
```

#### Validation Functions
```typescript
function validateRRN(rrn: string): boolean;
function validatePassword(password: string): boolean;
function validateCourse(course: string): boolean;
function validateConfirmPassword(password: string, confirm: string): boolean;
```

### UI Components

#### Form Fields
1. **RRN Input**
   - Pattern validation
   - Real-time feedback
   - Error messaging
   - Format guidance

2. **Course Selection**
   - Grouped by department
   - Searchable dropdown
   - Validation on select
   - Default placeholder

3. **Password Fields**
   - Strength indicator
   - Match validation
   - Show/hide toggle
   - Requirements list

4. **Submit Button**
   - Loading state
   - Disabled state
   - Success state
   - Error state

### Error Messages

#### Validation Errors
```typescript
type ValidationError =
  | 'RRN_REQUIRED'
  | 'RRN_INVALID_FORMAT'
  | 'RRN_ALREADY_EXISTS'
  | 'PASSWORD_TOO_SHORT'
  | 'PASSWORD_TOO_WEAK'
  | 'PASSWORDS_DO_NOT_MATCH'
  | 'COURSE_REQUIRED'
  | 'COURSE_INVALID';
```

#### User-Friendly Messages
```typescript
const errorMessages: Record<ValidationError, string> = {
  RRN_REQUIRED: 'Registration number is required',
  RRN_INVALID_FORMAT: 'Please enter a valid registration number',
  RRN_ALREADY_EXISTS: 'This registration number is already registered',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORD_TOO_WEAK: 'Password must include numbers and special characters',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  COURSE_REQUIRED: 'Please select your course',
  COURSE_INVALID: 'Please select a valid course'
};
```

### Design System

#### Form Styling
```css
/* Input Base Styles */
.form-input {
  @apply w-full rounded-md border border-gray-700 
         bg-gray-800 px-4 py-2.5 text-white 
         placeholder-gray-500;
}

/* Focus States */
.form-input:focus {
  @apply border-indigo-500 ring-1 ring-indigo-500 
         outline-none;
}

/* Error States */
.form-input.error {
  @apply border-red-500 ring-1 ring-red-500;
}

/* Success States */
.form-input.success {
  @apply border-green-500 ring-1 ring-green-500;
}
```
