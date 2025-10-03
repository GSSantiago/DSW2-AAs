import { NavLink } from "react-router";
import { useUser } from "~/contexts/UserContext";

export default function AppNav() {
  const { user } = useUser();

  return (
    <nav className="w-full shadow-sm bg-white">
      <div className="wrapper">
        <div className="flex items-center justify-between h-15">
          <div className="flex items-center gap-6 h-full">
            <img
              src={"/logo-small.png"}
              alt="Logo"
              className="size-10 object-cover"
            />

            <div className="flex items-center gap-4 h-full">
              <NavLink to="/" className={"navbar-link"}>
                Minhas despesas
              </NavLink>
              <NavLink to="/family" className="navbar-link">
                Gastos da família
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-2 h-full navbar-link">
            <img
              src={user.avatar}
              alt="Avatar"
              className="size-10 object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
