import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import { ThemeSwitch } from "./ThemeSwitch";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { RxCross1 } from "react-icons/rx";
import CustomSelect from "./CustomSelect";

function Sidebar({
  toggleSidebar,
  onLogout,
  active,
  toggleDarkMode,
  darkMode,
}) {
  const isLogged = useSelector(selectAuth);
  const { t } = useTranslation("common");

  return (
    <div
      className={`
        fixed
        top-0
        right-0
        z-20
        h-screen
        w-80
        bg-[#1E2831]
        px-6
        text-white
        drop-shadow-lg
        duration-300
        ease-in-out
        max-md:z-40
        ${active ? "max-md:translate-x-0" : "max-md:translate-x-full"}
        [&>*]:mb-7
      `}
    >
      <div className="flex justify-end border-b border-solid border-gray-50">
        <IconContext.Provider
          value={{ className: "m-6 cursor-pointer", size: 25, color: "white" }}
        >
          <RxCross1 onClick={toggleSidebar} />
        </IconContext.Provider>
      </div>
      <div className="flex items-center">
        <CustomSelect />
        <ThemeSwitch
          sx={{ m: 1 }}
          onChange={toggleDarkMode}
          checked={darkMode}
          darkMode={darkMode}
        />
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
                  py-2
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
