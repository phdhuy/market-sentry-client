import { Routes, Route } from "react-router-dom";
import PortfolioPage from "../pages/portfolio/PortfolioPage";
import MarketPage from "../pages/market/MarketPage";
import AlertPage from "../pages/alert/AlertPage";
import ProfilePage from "../pages/setting/profile/ProfilePage";
import WatchlistPage from "../pages/watchlist/WatchlistPage";
import AccountSecurityPage from "../pages/setting/security/AccountSecurityPage";
import NotificationPage from "../pages/notification/NotificationPage";
import PrivateRoute from "./utils";

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/account-security" element={<AccountSecurityPage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Route>


      <Route path="*" element={<PortfolioPage />} />
    </Routes>
  );
};

export default AppRoutes;
