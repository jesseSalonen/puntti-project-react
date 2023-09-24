import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

function Header({ darkMode, toggleDarkMode, onLogout, toggleSidebar }) {
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
          [&>ul>li>a>svg]:mr-1
          [&>ul>li>a]:flex
          [&>ul>li>a]:items-center
          [&>ul>li]:ml-5
        "
    >
      <div>
        <Link to="/">
          <img src="/puntti-emblem.svg" alt="logo" width={90} height={90} />
        </Link>
      </div>
      <ul className="flex items-center justify-between">
        <li
          className="cursor-pointer p-2 text-white md:hidden"
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
