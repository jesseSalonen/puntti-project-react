import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {}, []);

  const toggleDarkMode = () => setDarkMode((prevDarkMode) => !prevDarkMode);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`
          min-h-screen
          bg-gradient-to-br
          from-gray-200
          to-white
          dark:bg-gradient-to-br 
          dark:from-[#1b242c] 
          dark:to-[#05121a]
        `}
      >
        <div
          className={`
          my-0 
          mx-auto 
          w-full
          max-w-screen-lg 
          py-0 
          px-5
          text-center
          text-gray-700
          dark:text-gray-300
        `}
        >
          <RouterProvider router={router} />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
