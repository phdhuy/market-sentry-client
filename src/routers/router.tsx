import { useRoutes } from "react-router-dom";
import PortfolioPage from "../pages/portfolio/PortfolioPage";
import MarketPage from "../pages/market/MarketPage";
import AlertPage from "../pages/alert/AlertPage";
import ProfilePage from "../pages/setting/profile/ProfilePage";
import WatchlistPage from "../pages/watchlist/WatchlistPage";
import AccountSecurityPage from "../pages/setting/security/AccountSecurityPage";
import NotificationPage from "../pages/notification/NotificationPage";
import PrivateRoute from "./utils";
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import NotFoundPage from "@/pages/error/404";
import AssetDetailPage from "@/pages/market/AssetDetailPage";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <MarketPage /> },
        { path: "market", element: <MarketPage /> },
        { path: "assets/:id", element: <AssetDetailPage /> },
        {
          element: <PrivateRoute />,
          children: [
            { path: "portfolio", element: <PortfolioPage /> },
            { path: "alert", element: <AlertPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "watchlist", element: <WatchlistPage /> },
            { path: "account-security", element: <AccountSecurityPage /> },
            { path: "notification", element: <NotificationPage /> },
          ],
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return routes;
};

export default AppRoutes;
