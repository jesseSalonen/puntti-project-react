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
import { logout, reset } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function MobileSidebar({
  toggleSidebar,
  onLogout,
  active,
  toggleDarkMode,
  darkMode,
}) {
  const { user } = useSelector((state) => state.auth);
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
        <RxCross1
          className="m-6 cursor-pointer"
          onClick={toggleSidebar}
          color="white"
        />
      </div>
      <ul className="flex flex-col items-center justify-between">
        {user ? (
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
              [&>select]:border
              [&>select]:border-solid 
              [&>select]:border-gray-50
              [&>select]:bg-gray-600
              [&>svg]:mr-1
            "
        >
          <FaFlag />
          <select
            name="sideBarLanguages"
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              toggleSidebar();
            }}
            defaultValue={i18n.language === "fi" ? "fi" : "en"}
          >
            <option value="fi">Finnish</option>
            <option value="en">English</option>
          </select>
        </li>
        <li
          className="
              flex
              h-6
              w-16
              cursor-pointer
              items-center
              justify-between
              rounded-md
              bg-gray-300
              [&>svg]:flex
              [&>svg]:h-full
              [&>svg]:w-full
              [&>svg]:items-center
              [&>svg]:justify-center
              [&>svg]:p-1
            "
          onClick={toggleDarkMode}
        >
          <MdOutlineLightMode
            className={`${!darkMode ? "rounded-md bg-green-400" : ""}`}
          />
          <MdOutlineDarkMode
            className={`${darkMode ? "rounded-md bg-green-400" : ""}`}
          />
        </li>
      </ul>
    </div>
  );
}

export default MobileSidebar;
