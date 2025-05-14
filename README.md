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
PUBLIC_SUPABASE_ANON_KEY=your_prod_supabase_anon_key
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
