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
        className="
          flex 
          cursor-pointer
          items-center 
          justify-center 
          rounded-md 
          bg-[#222C34]
          py-3 
          px-5 
          text-center 
          text-white
          dark:text-[#CFD7E5]
          hover:bg-[#3A4549]
          hover:text-green-700
          max-md:hidden
        "
      >
        {t(buttonText)}
      </button>
    );
  };

  return (
    <header
      className="
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
          border-[#1E2831]
          bg-current
          py-1
          px-7
          dark:bg-gradient-to-br
          [&>ul>li>a:hover]:text-gray-400
          dark:[&>ul>li>a:hover]:text-[#CFD7E5]
          [&>ul>li>a>svg]:mr-1
          [&>ul>li>a]:flex
          [&>ul>li>a]:items-center
          [&>ul>li]:ml-5
        "
    >
      <ul className="flex items-center [&>li]:mr-4">
        <li>
          <Link to="/">
            <img src="/puntti-emblem.svg" alt="logo" width={90} height={90} />
          </Link>
        </li>
        {isLogged && (
          <>
            <li className="max-md:hidden">
              <Link to="/exercises">{linkButton("exercises")}</Link>
            </li>
            <li className="max-md:hidden">
              <Link to="/exercises/add">{linkButton("addExercise")}</Link>
            </li>
            <li className="max-md:hidden">
              <Link to="/workouts">{linkButton("workouts")}</Link>
            </li>
          </>
          )}
      </ul>
      <ul className="flex items-center justify-between">
        {isLogged && (
        <li>
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
            text-center 
            text-base 
            font-bold 
            text-green-800
            max-w-xs
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
