import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-700 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Access Pass System</h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/passes"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              My Passes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/treasury"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Treasury
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
