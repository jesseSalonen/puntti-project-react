import { RxCross1 } from "react-icons/rx";
import {
  FaFlag,
  FaHamburger,
  FaLanguage,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function MobileSidebar({ toggleSidebar, onLogout }) {
  const { user } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation("common");

  return (
    <div
      className="
        fixed
        top-0
        right-0
        z-10
        h-full
        w-52
        bg-gray-600
        px-2
        text-white
        sm:hidden
        [&>ul>li>a:hover]:text-gray-400
        [&>ul>li>a>svg]:mr-1
        [&>ul>li>a]:mt-4
        [&>ul>li>a]:flex
        [&>ul>li>a]:items-center
      "
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
              onClick={onLogout}
            >
              <FaSignOutAlt className="mr-2" />
              {t("logout")}
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                {t("login")}
              </Link>
            </li>
            <li>
              <Link to="/register">
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
              [&>select]:text-gray-600
              [&>svg]:mr-1
            "
        >
          <FaFlag />
          <select
            name="sideBarLanguages"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            defaultValue={i18n.language === "fi" ? "fi" : "en"}
          >
            <option value="fi">Finnish</option>
            <option value="en">English</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default MobileSidebar;
