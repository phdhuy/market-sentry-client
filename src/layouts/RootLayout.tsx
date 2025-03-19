import Sidebar from "@/components/Sidebar/Sidebar";
import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors flex">
        <div className="h-screen overflow-y-auto transition-all duration-300">
          <Sidebar />
        </div>

        <div className="flex-1 h-screen overflow-y-auto p-6 ">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
