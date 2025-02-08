import {
  LayoutDashboard,
  Globe,
  CircleAlert,
  Bell,
  Star,
  Settings,
  PanelRightOpen,
  PanelLeftOpen,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProps } from "@/types/SidebarProps";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Sidebar({
  isExpanded,
  setIsExpanded,
  setSelectedPage,
}: SidebarProps): JSX.Element {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
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
    <aside
      className={`border-r bg-background/50 backdrop-blur h-screen ${
        isExpanded ? "w-64" : "w-16"
      } transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <PanelRightOpen className="h-6 w-6" />
            ) : (
              <PanelLeftOpen className="h-6 w-6" />
            )}
          </Button>
          {isExpanded && <span className="font-bold">StockAlert</span>}
        </div>

        <nav className="space-y-2 px-2">
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
              {isExpanded && label}
            </Button>
          ))}

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="h-4 w-4" />
              {isExpanded && "Settings"}
              {isExpanded &&
                (isSettingsOpen ? (
                  <ChevronDown className="h-4 w-4 ml-auto" />
                ) : (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                ))}
            </Button>

            {isSettingsOpen && (
              <div className="ml-6 space-y-1">
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
                    {isExpanded && label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="border-t p-2 flex justify-center">
        {mounted && (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-5 w-5 text-yellow-500" />
                {isExpanded && "Light Mode"}
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 text-gray-800" />
                {isExpanded && "Dark Mode"}
              </>
            )}
          </Button>
        )}
      </div>
    </aside>
  );
}