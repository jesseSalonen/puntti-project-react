import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import ExerciseSearch from "./pages/exercises/ExerciseSearch";
import WorkoutSearch from "./pages/workouts/WorkoutSearch";
import AddWorkout from "./pages/workouts/AddWorkout";
import Exercise from "./pages/exercises/Exercise";
import AddExercise from "./pages/exercises/AddExercise";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionHelpers from "./helpers/SessionHelpers";
import { THEME_MODE } from "./helpers/constants";
import Layout from "./components/layout/Layout";
import Workout from './pages/workouts/Workout.jsx';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = SessionHelpers.getTheme();
    if (storedTheme) {
      if (storedTheme === THEME_MODE.dark) {
        setDarkMode(true);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    SessionHelpers.saveTheme(!darkMode ? THEME_MODE.dark : THEME_MODE.light);
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="/exercises">
            <Route index element={<ExerciseSearch />} />
            <Route path=":id" element={<Exercise />} />
            <Route path="add" element={<AddExercise />} />
          </Route>
          <Route path="/workouts">
            <Route index element={<WorkoutSearch />} />
            <Route path=":id" element={<Workout />} />
            <Route path="add" element={<AddWorkout />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`
          min-h-screen
          bg-[#FAFBFA]
          dark:bg-gradient-to-br 
          dark:from-[#1A242D] 
          dark:to-[#09151E]
        `}
      >
        <div
          className={`
          my-0 
          mx-auto 
          w-full
          p-0
          text-gray-700
          dark:text-[#CFD7E5]
        `}
        >
          <RouterProvider router={router} />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
