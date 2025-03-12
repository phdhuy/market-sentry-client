import {
  Globe,
  CircleAlert,
  Bell,
  Star,
  Settings,
  ChevronDown,
  ChevronRight,
  PieChartIcon as ChartPie,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useCountUnreadNotification } from "@/hooks/use-count-unread-notification"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const { data } = useCountUnreadNotification()
  const count = data?.data.count ?? 0

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
  ]

  const settingsItems = [
    { path: "/profile", label: "Profile" },
    { path: "/account-security", label: "Account Security" },
  ]

  useEffect(() => {
    if (collapsed && isSettingsOpen) {
      setIsSettingsOpen(false)
    }
  }, [collapsed, isSettingsOpen])

  return (
    <aside
      className={`border-r border-border/40 bg-background/50 backdrop-blur-sm min-h-screen flex flex-col shadow-sm transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
        {!collapsed && <img src="/logo-full-bl.png" alt="Market Sentry Icon" className="h-8 w-40" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={`h-8 w-8 rounded-full ${collapsed ? "mx-auto" : ""}`}
        >
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <div className="flex flex-col flex-grow p-3 space-y-1">
        <nav className="space-y-1 py-2">
          <TooltipProvider delayDuration={0}>
            {menuItems.map(({ path, label, icon: Icon, count }) => {
              const isActive = location.pathname === path
              return (
                <Tooltip key={path}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "ghost" : "ghost"}
                      className={`w-full justify-${collapsed ? "center" : "start"} text-sm font-medium h-10 px-3 border ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "text-muted-foreground hover:text-foreground border-transparent hover:border-border/60"
                      }`}
                      onClick={() => navigate(path)}
                    >
                      <Icon className={`h-4 w-4 ${collapsed ? "" : "mr-3"} shrink-0`} />
                      {!collapsed && label}
                      {!collapsed && typeof count === "number" && count > 0 && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                          {count}
                        </span>
                      )}
                      {collapsed && typeof count === "number" && count > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-medium text-primary-foreground">
                          {count}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </nav>

        <div className="mt-2 pt-2 border-t border-border/40">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-${collapsed ? "center" : "start"} text-sm font-medium h-10 px-3 text-muted-foreground hover:text-foreground border border-transparent hover:border-border/60`}
                  onClick={() => !collapsed && setIsSettingsOpen(!isSettingsOpen)}
                >
                  <Settings className={`h-4 w-4 ${collapsed ? "" : "mr-3"} shrink-0`} />
                  {!collapsed && (
                    <>
                      Settings
                      {isSettingsOpen ? (
                        <ChevronDown className="h-3.5 w-3.5 ml-auto opacity-70" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-70" />
                      )}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Settings</TooltipContent>}
            </Tooltip>
          </TooltipProvider>

          {!collapsed && isSettingsOpen && (
            <div className="mt-1 ml-7 space-y-1 pl-0.5">
              {settingsItems.map(({ path, label }) => {
                const isActive = location.pathname === path
                return (
                  <Button
                    key={path}
                    variant={isActive ? "ghost" : "ghost"}
                    size="sm"
                    className={`w-full justify-start text-xs h-8 border ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-muted-foreground hover:text-foreground border-transparent hover:border-border/60"
                    }`}
                    onClick={() => navigate(path)}
                  >
                    {label}
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-border/40 mt-auto">
        {!collapsed && (
          <div className="text-xs text-muted-foreground text-center">Market Sentry © {new Date().getFullYear()}</div>
        )}
      </div>
    </aside>
  )
}