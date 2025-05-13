# Events Client Application

A modern web application for managing and exploring events, built with SvelteKit and Supabase.

## Features

- 🎫 Event Exploration: Browse and search through various events
- 👤 User Authentication: Secure login and registration system
- 🎯 Event Details: Comprehensive event information including dates, location, and availability
- 🎨 Modern UI: Beautiful and responsive design with Tailwind CSS
- 🔐 Protected Routes: Secure access control for authenticated users

## Tech Stack

- **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Authentication**: Supabase Auth
- **Package Manager**: npm
- **Development Environment**: Vite

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
│   │   └── Header.svelte      # Navigation header
│   ├── types/           # TypeScript type definitions
│   └── userstate.svelte.ts    # User state management
└── routes/              # Application routes
    ├── auth/            # Authentication routes
    └── explore/         # Event exploration
        └── events/      # Event listing and details
```

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

### Header
Navigation component with:
- Brand logo
- User authentication status
- Navigation links
- User profile

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

3. Start development server:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run check`: Type-check the project
- `npm run lint`: Run ESLint and Prettier checks
- `npm run format`: Format code with Prettier

## Database Schema

### Events Table
- `id`: Unique identifier
- `name`: Event name
- `description`: Event description
- `start_date`: Start date
- `end_date`: End date
- `time`: Event time
- `location`: Event location
- `price`: Event price
- `max_slots`: Maximum participants
- `booked_slots`: Current bookings
- `food_provided`: Food availability flag
- `od_provided`: OD availability flag
- `is_sold_out`: Sold out status
- `color`: Theme color for UI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
