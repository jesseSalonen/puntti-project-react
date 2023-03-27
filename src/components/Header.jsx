import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/">GoalSetter</Link>
        </div>
        <ul>
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
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
