"use client"

import { Plus, Trash2, Mail, BellRing, AlertCircle, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface Alert {
  id: string
  symbol: string
  price: number
  type: "above" | "below"
  notifications: ("email" | "push")[]
  isActive: boolean
}

export default function AlertPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      symbol: "BTC/USDT",
      price: 63600.0,
      type: "above",
      notifications: ["email", "push"],
      isActive: true,
    },
    {
      id: "2",
      symbol: "ETH/USDT",
      price: 3200.0,
      type: "below",
      notifications: ["email"],
      isActive: true,
    },
  ])

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
            Price Alerts
          </h1>
          <p className="text-muted-foreground mt-1">
            Get notified when your favorite cryptocurrencies hit your target price
          </p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30">
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </Button>
      </div>

      <div className="grid gap-8">
        <Card className="border-border/40 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Create New Alert
            </CardTitle>
            <CardDescription>Set up price alerts for your selected cryptocurrency</CardDescription>
            <Separator className="mt-4" />
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cryptocurrency</Label>
                <Select>
                  <SelectTrigger className="h-10 border-border/60 bg-background/50 focus:ring-orange-500">
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                    <SelectItem value="sol">Solana (SOL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Target Price (USDT)</Label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  className="h-10 border-border/60 bg-background/50 focus-visible:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Alert Type</Label>
              <RadioGroup defaultValue="above" className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-md px-4 py-2.5">
                  <RadioGroupItem value="above" id="above" className="text-orange-500" />
                  <Label htmlFor="above" className="flex items-center gap-1.5">
                    <ArrowUp className="w-3.5 h-3.5 text-green-500" />
                    Price goes above
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-md px-4 py-2.5">
                  <RadioGroupItem value="below" id="below" className="text-orange-500" />
                  <Label htmlFor="below" className="flex items-center gap-1.5">
                    <ArrowDown className="w-3.5 h-3.5 text-red-500" />
                    Price goes below
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Notification Methods</Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-md px-4 py-2.5 flex-1">
                  <Switch id="email" className="data-[state=checked]:bg-orange-500" />
                  <Label htmlFor="email" className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-background/50 border border-border/60 rounded-md px-4 py-2.5 flex-1">
                  <Switch id="push" className="data-[state=checked]:bg-orange-500" />
                  <Label htmlFor="push" className="flex items-center gap-1.5">
                    <BellRing className="w-3.5 h-3.5 text-purple-500" />
                    Push Notification
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/40 pt-4 flex justify-end">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-orange-500/30">
              Create Alert
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-border/40 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <BellRing className="w-5 h-5 text-orange-500" />
              Active Alerts
            </CardTitle>
            <CardDescription>Manage your existing price alerts</CardDescription>
            <Separator className="mt-4" />
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No active alerts. Create one to get started.</div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg gap-4 transition-all duration-200 ${
                    alert.isActive
                      ? "bg-background/50 border border-border/60 shadow-sm hover:shadow-md"
                      : "bg-muted/30 border border-border/30 opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={alert.isActive}
                      onCheckedChange={() => toggleAlert(alert.id)}
                      className="data-[state=checked]:bg-orange-500"
                      aria-label="Toggle alert"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{alert.symbol}</h3>
                        <Badge
                          variant={alert.type === "above" ? "outline" : "outline"}
                          className={`${
                            alert.type === "above"
                              ? "border-green-500/50 bg-green-500/10 text-green-600"
                              : "border-red-500/50 bg-red-500/10 text-red-600"
                          }`}
                        >
                          {alert.type === "above" ? (
                            <span className="flex items-center gap-1">
                              <ArrowUp className="w-3 h-3" /> Above
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <ArrowDown className="w-3 h-3" /> Below
                            </span>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Target: <span className="font-medium">${alert.price.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {alert.notifications.includes("email") && (
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500">
                          <Mail className="w-4 h-4" />
                        </div>
                      )}
                      {alert.notifications.includes("push") && (
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500">
                          <BellRing className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}