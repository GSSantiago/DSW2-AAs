import AppNav from "~/components/AppNav";
import BottomNav from "~/components/BottomNav";
import type { Route } from "./+types/layout";
import { Outlet, Link, useNavigate } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wallety Dashboard" },
    { name: "description", content: "Your personal finance dashboard" },
  ];
}

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background relative pb-15 md:pb-0">
      {/* Navigation */}
      <AppNav />

      {/* Main Content */}
      <main className="wrapper">
        <div className="py-4 md:py-6">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
