import { RxCross1 } from "react-icons/rx";
import {
  FaFlag,
  FaHamburger,
  FaLanguage,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, reset, selectAuth } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IconContext } from "react-icons";
import ThemeSwitch from "./ThemeSwitch";
import { FormControl, MenuItem, Select } from "@mui/material";

function MobileSidebar({
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
        z-10
        h-full
        w-52
        bg-gray-600
        bg-gradient-to-r
        from-[#1c262e]
        to-[#1d262e]
        px-2
        text-white
        duration-300
        ease-in-out
        sm:hidden
        [&>ul>li>a:hover]:text-gray-400
        [&>ul>li>a>svg]:mr-1
        [&>ul>li>a]:flex
        [&>ul>li>a]:items-center
        [&>ul>li]:mt-4
        ${active ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex justify-end border-b border-solid border-gray-50">
        <IconContext.Provider
          value={{ className: "m-6 cursor-pointer", size: 25, color: "white" }}
        >
          <RxCross1 onClick={toggleSidebar} />
        </IconContext.Provider>
      </div>
      <ul className="flex flex-col items-center justify-between">
        {isLogged ? (
          <li>
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
              onClick={() => {
                onLogout();
                toggleSidebar();
              }}
            >
              <FaSignOutAlt className="mr-2" />
              {t("logout")}
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={toggleSidebar}>
                <FaSignInAlt />
                {t("login")}
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={toggleSidebar}>
                <FaUser />
                {t("register")}
              </Link>
            </li>
          </>
        )}
        <li
          className="
            mt-4
            flex 
            items-center
          "
        >
          <FormControl fullWidth>
            <Select
              value={i18n.language === "fi" ? "fi" : "en"}
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                toggleSidebar();
              }}
            >
              <MenuItem value="fi">Finnish</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
        </li>
        <li>
          <ThemeSwitch toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </li>
      </ul>
    </div>
  );
}

export default MobileSidebar;
