import {
  Globe,
  CircleAlert,
  Bell,
  Star,
  Settings,
  ChevronDown,
  ChevronRight,
  ChartPie,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCountUnreadNotification } from "@/hooks/use-count-unread-notification";

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { data } = useCountUnreadNotification();
  const count = data?.data.count ?? 0;

  const menuItems = [
    { path: "/market", label: "Market", icon: Globe },
    { path: "/portfolio", label: "Portfolio", icon: ChartPie },
    { path: "/alert", label: "My Alerts", icon: CircleAlert },
    {
      path: "/notification",
      label: "Notifications",
      icon: Bell,
      count,
    },
    { path: "/watchlist", label: "Watchlist", icon: Star },
  ];

  const settingsItems = [
    { path: "/profile", label: "Profile" },
    { path: "/account-security", label: "Account Security" },
  ];

  return (
    <aside className="border-r bg-background/50 backdrop-blur min-h-screen w-64 transition-all duration-300 flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col flex-grow">
        <div className="flex h-16 items-center border-b px-4">
          <img
            src="/logo-full-bl.png"
            alt="Market Sentry Icon"
            className="h-8 w-40 mr-2 justify-center"
          />
        </div>

        <div className="space-y-4 px-2 flex-grow">
          {menuItems.map(({ path, label, icon: Icon, count }) => (
            <Button
              key={path}
              variant={location.pathname === path ? "default" : "ghost"}
              className="w-full justify-start gap-2 relative"
              onClick={() => navigate(path)}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {typeof count === "number" && count > 0 && (
                <span className="absolute right-4 top-1 text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </Button>
          ))}

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
              {isSettingsOpen ? (
                <ChevronDown className="h-4 w-4 ml-auto" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-auto" />
              )}
            </Button>

            {isSettingsOpen && (
              <div className="ml-6 space-y-2">
                {settingsItems.map(({ path, label }) => (
                  <Button
                    key={path}
                    variant={location.pathname === path ? "default" : "ghost"}
                    className="w-full justify-start text-sm gap-2"
                    onClick={() => navigate(path)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
