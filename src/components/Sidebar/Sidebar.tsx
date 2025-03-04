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
import { SidebarProps } from "@/types/SidebarProps";
import { useState } from "react";

export default function Sidebar({
  setSelectedPage,
}: SidebarProps): JSX.Element {
  const [activePage, setActivePage] = useState("portfolio");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { id: "portfolio", label: "Portfolio", icon: ChartPie },
    { id: "market", label: "Market", icon: Globe },
    { id: "alert", label: "My Alerts", icon: CircleAlert },
    { id: "notification", label: "Notifications", icon: Bell },
    { id: "watchlist", label: "Watchlist", icon: Star },
  ];

  const settingsItems = [
    { id: "profile", label: "Profile" },
    { id: "account-security", label: "Account Security" },
    { id: "preferences", label: "Preferences" },
  ];

  return (
    <aside className="border-r bg-background/50 backdrop-blur min-h-screen w-64 transition-all duration-300 flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col flex-grow">
        <div className="flex h-16 items-center border-b px-4">
          <img
            src="/icon.png"
            alt="Market Sentry Icon"
            className="h-8 w-8 mr-2"
          />
          <span className="font-bold whitespace-nowrap">Market Sentry</span>
        </div>

        <div className="space-y-4 px-2 flex-grow">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activePage === id ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => {
                setActivePage(id);
                setSelectedPage(id);
              }}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
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
              <div className="ml-6 space-y-4">
                {settingsItems.map(({ id, label }) => (
                  <Button
                    key={id}
                    variant={activePage === id ? "default" : "ghost"}
                    className="w-full justify-start text-sm gap-2"
                    onClick={() => {
                      setActivePage(id);
                      setSelectedPage(id);
                    }}
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
