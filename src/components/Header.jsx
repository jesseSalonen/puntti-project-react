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
          flex 
          justify-between 
          items-center 
          py-1 
          px-0 
          border-b 
          border-solid 
          border-gray-200 
          mb-16
        "
      >
        <div className="logo">
          <Link to="/">
            <img src="puntti-emblem.svg" alt="logo" width={64} height={64} />
          </Link>
        </div>
        <ul className="flex items-center justify-between">
          {user ? (
            <li className="ml-5">
              <button
                className="
                  py-3 
                  px-5 
                  border 
                  border-solid 
                  border-black 
                  rounded-md 
                  bg-black 
                  text-white 
                  text-base 
                  font-bold 
                  cursor-pointer 
                  text-center 
                  flex 
                  items-center 
                  justify-center
                  hover:scale-95
                "
                onClick={onLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          ) : (
            <>
              <li className="ml-5">
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="ml-5">
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
