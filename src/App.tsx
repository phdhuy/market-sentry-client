import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "next-themes";
import AppRoutes from "./routers/router";

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
            <AppRoutes />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
