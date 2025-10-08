import { NavLink } from "react-router";
import { useUser } from "~/contexts/UserContext";
import { Home, Users, User } from "lucide-react";

export default function BottomNav() {
  const { user } = useUser();

  return (
    <nav className="w-full shadow-sm bg-white fixed bottom-0 border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center h-15">
        <BottomNavItem to="/" icon={<Home className="size-5" />} label="Home" />

        <BottomNavItem
          to="/family"
          icon={<Users className="size-5" />}
          label="Família"
        />

        <BottomNavItem
          to="/profile"
          icon={user ? <img src={user.avatar} alt="Avatar" className="size-6 object-cover rounded-full" /> : null}
          label="Conta"
        />
      </div>
    </nav>
  );
}

const BottomNavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center flex-1 gap-1 transition-colors border-1 border-transparent rounded-full ${
          isActive
            ? "text-primary [&>img]:border-primary"
            : "text-gray-500"
        }`
      }
    >
      <span className="size-6 flex items-center justify-center">{icon}</span>
      <span className="text-xs">{label}</span>
    </NavLink>
  );
};
