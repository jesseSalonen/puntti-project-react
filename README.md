# puntti-project-react

React frontend application for gym statistics and workout tracking.

## Project Structure

- `index.html`: The main HTML file
- `src/main.jsx`: The entry point of the application
- `src/App.jsx`: The main application component
- `src/components`: Reusable UI components
  - `layout`: Contains Header, Layout, and Sidebar components
- `src/pages`: Various page components for different routes
- `src/features`: Feature-based modules
  - `auth`: Authentication related functionality
  - `exercises`: Exercise management features
  - `muscles`: Muscle group tracking
  - `workouts`: Workout logging and tracking
- `src/helpers`: Helper functions and constants
- `src/translations`: Internationalization resources
- `src/app`: Application configuration including store setup
- `src/AxiosConfig.js`: API communication configuration

## Technology Stack

- **Frontend Framework**: React 18.2.0
- **Routing**: React Router DOM 6.9.0
- **State Management**: Redux Toolkit 1.9.3 with React Redux 8.0.5
- **UI Components**: Material UI 5.13.4 with Emotion styling
- **Styling**: TailwindCSS 3.2.7
- **HTTP Client**: Axios 1.3.4
- **Internationalization**: i18next 22.4.15
- **Table Management**: TanStack React Table 8.20.5
- **Build Tool**: Vite 6.2.2
- **Notifications**: React Toastify 9.1.2

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/puntti-project-react.git
   cd puntti-project-react
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. For network access (to test on mobile devices):
   ```sh
   npm run host
   ```

## Features

- **User Authentication**: Login, registration, and account management
- **Exercise Library**: Create and manage custom exercises
- **Workout Tracking**: Log workouts with sets, reps, and weights
- **Muscle Group Focus**: Track which muscle groups you're training
- **Internationalization**: Supports English and Finnish languages
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on desktop and mobile devices

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run preview`: Previews the production build locally
- `npm run host`: Starts development server with network access

## Docker Support

The project includes Docker configuration for containerized deployment:
- `Dockerfile`: Container definition
- `.dockerignore`: Files excluded from the container

## Browser Compatibility

The application is built with modern JavaScript and should work in all current browsers.

## License

This project is licensed under the MIT License.