import Sidebar from "./components/Sidebar/Sidebar";
import MarketPage from "./pages/market/MarketPage";
import { ThemeProvider } from "next-themes";
import ProfilePage from "./pages/setting/profile/ProfilePage";
import WatchlistPage from "./pages/watchlist/WatchlistPage";
import NotificationPage from "./pages/notification/NotificationPage";
import AccountSecurityPage from "./pages/setting/security/AccountSecurityPage";
import AlertPage from "./pages/alert/AlertPage";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "280px 1fr",
            transition: "all 0.3s ease",
          }}
        >
          <Sidebar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/alert" element={<AlertPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/account-security" element={<AccountSecurityPage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="*" element={<PortfolioPage />} /> {/* Fallback Route */}
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}