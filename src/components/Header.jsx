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
import MobileSidebar from "./MobileSidebar";

function Header() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const toggleSidebar = () =>
    setSidebarActive((prevSidebarActive) => !prevSidebarActive);

  return (
    <div>
      <header
        className="
          mb-16 
          flex 
          items-center 
          justify-between 
          border-b 
          border-solid 
          border-gray-200 
          py-1 
          px-0
          [&>ul>li>a:hover]:text-gray-400
          [&>ul>li>a>svg]:mr-1
          [&>ul>li>a]:flex
          [&>ul>li>a]:items-center
          [&>ul>li]:ml-5
        "
      >
        <div className="logo">
          <Link to="/">
            <img src="puntti-emblem.svg" alt="logo" width={64} height={64} />
          </Link>
        </div>
        <ul className="flex items-center justify-between">
          {user ? (
            <li className="max-sm:hidden">
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
              <li className="max-sm:hidden">
                <Link to="/login">
                  <FaSignInAlt />
                  {t("login")}
                </Link>
              </li>
              <li className="max-sm:hidden">
                <Link to="/register">
                  <FaUser />
                  {t("register")}
                </Link>
              </li>
            </>
          )}
          <li
            className="
              flex
              items-center 
              max-sm:hidden
              [&>svg]:mr-1
            "
          >
            <FaFlag />
            <select
              name="languages"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              defaultValue={i18n.language === "fi" ? "fi" : "en"}
            >
              <option value="fi">Finnish</option>
              <option value="en">English</option>
            </select>
          </li>
          <li className="cursor-pointer p-2 sm:hidden" onClick={toggleSidebar}>
            <AiOutlineMenu />
          </li>
        </ul>

        {sidebarActive ? (
          <MobileSidebar toggleSidebar={toggleSidebar} onLogout={onLogout} />
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
