import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function Layout({ darkMode, toggleDarkMode }) {
  const [sidebarActive, setSidebarActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const toggleSidebar = () =>
    setSidebarActive((prevSidebarActive) => !prevSidebarActive);

  return (
    <>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onLogout={onLogout}
        toggleSidebar={toggleSidebar}
      />
      <main
        className="
          pr-80
          pt-36
          max-md:pr-0
        "
      >
        <Outlet />
      </main>
      <Sidebar
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
        active={sidebarActive}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
    </>
  );
}

export default Layout;
