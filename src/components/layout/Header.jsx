import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { useTranslation } from "react-i18next";
import { selectUserLogged } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

function Header({ darkMode, toggleDarkMode, onLogout, toggleSidebar }) {
  const { t } = useTranslation("common");
  const isLogged = useSelector(selectUserLogged);

  const linkButton = (buttonText) => {
    return (
      <button
        className={`
          flex 
          cursor-pointer
          items-center 
          justify-center 
          rounded-md 
          py-3 
          px-5 
          text-center 
          transition-colors
          duration-200
          max-md:hidden
          ${darkMode 
            ? 'bg-[#222C34] text-white hover:bg-[#3A4549] hover:text-green-400' 
            : 'bg-white text-gray-800 shadow-sm hover:bg-green-50 hover:text-green-700 border border-green-200'
          }
        `}
      >
        {t(buttonText)}
      </button>
    );
  };

  return (
    <header
      className={`
          fixed
          top-0
          z-30
          flex
          min-h-fit
          w-full
          items-center
          justify-between
          border-b-4
          border-solid
          py-1
          px-7
          ${darkMode 
            ? 'border-[#1E2831] bg-gradient-to-br from-gray-800 to-gray-900' 
            : 'border-green-600 bg-gradient-to-r from-white to-green-100'
          }
          [&>ul>li>a>svg]:mr-1
          [&>ul>li>a]:flex
          [&>ul>li>a]:items-center
          [&>ul>li]:ml-5
          max-md:[&>ul>li]:ml-2
          ${darkMode
            ? '[&>ul>li>a:hover]:text-[#CFD7E5]'
            : '[&>ul>li>a:hover]:text-green-600'
          }
        `}
    >
      <ul className="flex items-center [&>li]:mr-4 max-md:[&>li]:mr-2">
        <li>
          <Link to="/">
            <img src="/puntti-emblem.svg" alt="logo" className="w-[90px] h-[90px] max-md:w-[70px] max-md:h-[70px]" />
          </Link>
        </li>
        {isLogged && (
          <>
            <li className="max-md:hidden">
              <Link to="/exercises">{linkButton("exercises")}</Link>
            </li>
            <li className="max-md:hidden">
              <Link to="/workouts">{linkButton("workouts")}</Link>
            </li>
            <li className="max-md:hidden">
              <Link to="/programs">{linkButton("programs")}</Link>
            </li>
          </>
          )}
      </ul>
      <ul className="flex items-center justify-between max-md:ml-1">
        {isLogged && (
        <li className="max-md:mr-1">
        <button
          className="
            flex 
            cursor-pointer
            items-center 
            justify-center 
            rounded-md 
            bg-gradient-to-r
            from-green-500
            to-green-100
            py-3
            px-5
            max-md:py-2 
            max-md:px-3
            text-center 
            text-base 
            font-bold 
            text-green-800
            max-w-xs
            whitespace-nowrap
          "
        >
          {t("startWorkout")}
        </button>
      </li>
        )}
        <li
          className="cursor-pointer p-2 text-white dark:text-[#CFD7E5] md:hidden ml-2"
          onClick={toggleSidebar}
        >
          <IconContext.Provider value={{ size: 25 }}>
            <AiOutlineMenu />
          </IconContext.Provider>
        </li>
      </ul>
    </header>
  );
}

export default Header;
