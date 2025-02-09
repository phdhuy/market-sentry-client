import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/dashboard/Dashboard";
import MarketPage from "./pages/market/MarketPage";
import { ThemeProvider } from "next-themes";
import ProfilePage from "./pages/setting/profile/ProfilePage";
import WatchlistPage from "./pages/watchlist/WatchlistPage";
import NotificationPage from "./pages/notification/NotificationPage";
import AccountSecurityPage from "./pages/setting/security/AccountSecurityPage";
import AlertPage from "./pages/alert/AlertPage";

export default function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const renderPage = () => {
    switch (selectedPage) {
      case "dashboard":
        return <DashboardPage />;
      case "market":
        return <MarketPage />;
      case "alert":
        return <AlertPage />;
      case "profile":
        return <ProfilePage />;
      case "watchlist":
        return <WatchlistPage />;
      case "account-security":
        return <AccountSecurityPage />;
      case "notification":
        return <NotificationPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
        <div
          className="grid"
          style={{
            gridTemplateColumns: isSidebarExpanded ? "280px 1fr" : "64px 1fr",
            transition: "all 0.3s ease",
          }}
        >
          <Sidebar
            isExpanded={isSidebarExpanded}
            setIsExpanded={setIsSidebarExpanded}
            setSelectedPage={setSelectedPage}
          />
          <main className="p-6">{renderPage()}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}