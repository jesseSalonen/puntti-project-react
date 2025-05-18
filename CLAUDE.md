# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Puntti Project is a React-based application for gym statistics and workout tracking. It allows users to manage exercises, track workouts, log workout sessions, and create training programs. The application supports both English and Finnish languages and offers dark/light mode theming.

## Development Commands

```bash
# Start development server
npm run dev

# Start development server with network access (for mobile testing)
npm run host

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture Overview

### Tech Stack
- React 18.2.0 with Vite as the build tool
- State management: Redux Toolkit with React Redux
- Routing: React Router DOM 6.9.0
- UI Components: Material UI with Emotion styling and TailwindCSS
- HTTP Client: Axios
- Internationalization: i18next
- Data Tables: TanStack React Table
- Notifications: React Toastify

### Core Application Structure

1. **State Management**
   - Redux store configured in `src/app/store.js`
   - Feature-based slices in `src/features/`
   - Each feature (auth, exercises, muscles, workouts, programs, sessions) has:
     - A service file for API calls
     - A slice file for Redux state management

2. **Routing and Layout**
   - Main routing defined in `App.jsx`
   - Protected routes using `ProtectedRoute.jsx` component
   - Base layout in `components/layout/Layout.jsx`

3. **Features**
   - Authentication (login/register)
   - Exercise management
   - Muscle group tracking
   - Workout creation and tracking
   - Training program management
   - Workout session logging

4. **Theme Management**
   - Dark/light mode toggle
   - Theme persistence via `SessionHelpers`

5. **Internationalization**
   - Supports English and Finnish
   - Language files in `src/translations/`

## Key Files and Components

- `src/App.jsx`: Main application component and routing configuration
- `src/main.jsx`: Application entry point with Redux Provider setup
- `src/app/store.js`: Redux store configuration with all reducers
- `src/AxiosConfig.js`: API client configuration using environment variables
- `src/components/layout/Layout.jsx`: Main layout component with header/sidebar
- `src/components/ProtectedRoute.jsx`: Authentication protection for routes

## Environment Variables

The application uses environment variables for configuration:
- `VITE_API_URL`: Base URL for the backend API