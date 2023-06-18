import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import { FormControl, MenuItem, Select } from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({
  toggleSidebar,
  onLogout,
  active,
  toggleDarkMode,
  darkMode,
}) {
  const isLogged = useSelector(selectAuth);
  const { t, i18n } = useTranslation("common");

  return (
    <div
      className={`
        fixed
        top-0
        right-0
        z-20
        h-screen
        w-96
        bg-[#1E2831]
        px-6
        pt-28
        text-white
        drop-shadow-lg
        [&>*]:mb-7
      `}
    >
      <div className="flex items-center">
        <FormControl fullWidth>
          <Select
            value={i18n.language === "fi" ? "fi" : "en"}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <MenuItem value="fi">Finnish</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>
        <ThemeSwitch toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>
      {isLogged ? (
        <button
          className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  rounded-full
                  bg-black
                  bg-gradient-to-r
                  from-green-50
                  to-green-400
                  py-3
                  px-6
                  text-green-900
                "
          onClick={onLogout}
        >
          {t("logout")}
        </button>
      ) : (
        <>
          <div>
            <Link to="/login">
              <button
                className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-solid
                      border-black
                      bg-black
                      py-3
                      px-5
                      text-center
                      text-base
                      font-bold
                      text-white
                      hover:scale-95
                    "
              >
                <FaSignInAlt />
                {t("login")}
              </button>
            </Link>
          </div>
          <div>
            <Link to="/register">
              <button
                className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-solid
                      border-black
                      bg-black
                      py-3
                      px-5
                      text-center
                      text-base
                      font-bold
                      text-white
                      hover:scale-95
                    "
              >
                <FaUser />
                {t("register")}
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
