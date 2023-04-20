import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
