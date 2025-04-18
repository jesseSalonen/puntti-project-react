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

  const navigationButton = (to, buttonText) => {
    return (
      <Link to={to} onClick={toggleSidebar}>
        <button
          className={`
            flex
            w-full
            cursor-pointer
            items-center
            rounded-md
            py-3
            px-5
            text-center
            mb-4
            border
            transition-colors
            duration-200
            ${darkMode 
              ? 'bg-gray-800 text-white border-green-800/40 hover:bg-gray-700 hover:text-green-400' 
              : 'bg-white text-gray-800 border-green-300 hover:bg-green-50 hover:text-green-700'
            }
          `}
        >
          {t(buttonText)}
        </button>
      </Link>
    );
  };

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
          ${darkMode 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-white border-green-800/30' 
            : 'bg-gradient-to-b from-white to-gray-100 text-gray-800 border-green-300/50'
          }
          px-6
          drop-shadow-lg
          duration-300
          ease-in-out
          max-md:z-40
          ${active ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
          [&>*]:mb-7
          border-l
        `}
      >
        <div className={`flex justify-end border-b border-solid ${darkMode ? 'border-green-800/30' : 'border-green-300'} pb-2`}>
          <IconContext.Provider
            value={{
              className: 'm-6 cursor-pointer hover:text-green-400 transition-colors duration-200', 
              size: 25, 
              color: darkMode ? 'white' : '#1b6742'
            }}
          >
            <RxCross1 onClick={toggleSidebar}/>
          </IconContext.Provider>
        </div>
        <div className={`
          flex 
          items-center 
          justify-between 
          p-3 
          rounded-lg 
          border 
          ${darkMode 
            ? 'bg-gray-800/50 border-green-800/30' 
            : 'bg-green-50/70 border-green-200'
          }
        `}>
          <FormControl fullWidth className="mr-3">
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
        
        {/* Mobile navigation buttons */}
        {isLogged && (
          <div className="md:hidden">
            {navigationButton("/exercises", "exercises")}
            {navigationButton("/exercises/add", "addExercise")}
            {navigationButton("/workouts", "workouts")}
          </div>
        )}
        
        {isLogged ? (
          <button
            className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  bg-gradient-to-r
                  from-green-400
                  to-green-600
                  py-2
                  px-6
                  text-white
                  font-medium
                  shadow-md
                  hover:shadow-green-400/20
                  transition-shadow
                  duration-300
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
            <p className={`
              font-bold 
              max-sm:text-2xl 
              text-center 
              my-4 
              border-t 
              border-b 
              py-3
              ${darkMode 
                ? 'text-[#CFD7E5] border-green-800/30' 
                : 'text-gray-700 border-green-300'
              }
            `}>
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
                  from-green-400
                  to-green-600
                  py-2
                  px-6
                  text-white
                  font-medium
                  shadow-md
                  hover:shadow-green-400/20
                  transition-shadow
                  duration-300
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
