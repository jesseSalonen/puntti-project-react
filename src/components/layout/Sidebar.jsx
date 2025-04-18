import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUserLogged } from "../../features/auth/authSlice";
import { ThemeSwitch } from "./ThemeSwitch";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { RxCross1 } from "react-icons/rx";
import { CustomSelect } from "../common/CustomSelect";
import { FormControl, MenuItem, Select } from "@mui/material";

function Sidebar({
  toggleSidebar,
  onLogout,
  active,
  toggleDarkMode,
  darkMode,
}) {
  const isLogged = useSelector(selectUserLogged);
  const { t, i18n } = useTranslation("common");

  return (
    <>
      {/* Overlay to detect clicks outside sidebar */}
      {active && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 max-md:z-30"
          onClick={toggleSidebar}
        />
      )}
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
          dark:text-[#CFD7E5]
          drop-shadow-lg
          duration-300
          ease-in-out
          max-md:z-40
          ${active ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
          [&>*]:mb-7
        `}
      >
        <div className="flex justify-end border-b border-solid border-gray-50">
          <IconContext.Provider
            value={{className: 'm-6 cursor-pointer', size: 25, color: 'white'}}
          >
            <RxCross1 onClick={toggleSidebar}/>
          </IconContext.Provider>
        </div>
        <div className="flex items-center">
          <FormControl fullWidth>
            <Select
              value={i18n.language.includes('fi') ? 'fi' : 'en'}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              MenuProps={{disableScrollLock: true}}
              input={<CustomSelect/>}
            >
              <MenuItem value="fi">Finnish</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
          <ThemeSwitch
            sx={{m: 1}}
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
            onClick={() => {
              onLogout();
              toggleSidebar();
            }}
          >
            {t('logout')}
          </button>
        ) : (
          <>
            <div>
              <Link to="/login" onClick={toggleSidebar}>
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
                >
                  <FaSignInAlt className="mr-2"/>
                  {t('login')}
                </button>
              </Link>
            </div>
            <p className="font-bold text-[#CFD7E5] max-sm:text-2xl">
              {t('notYetRegistered')}
            </p>
            <div>
              <Link to="/register" onClick={toggleSidebar}>
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
                >
                  <FaUserPlus className="mr-2"/>
                  {t('register')}
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Sidebar;
