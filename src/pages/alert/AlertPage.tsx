"use client"

import { Plus, Trash2, Mail, BellRing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface Alert {
  id: string
  symbol: string
  price: number
  type: "above" | "below"
  notifications: ("email" | "push")[]
  isActive: boolean
}

const alerts: Alert[] = [
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
]

export default function AlertPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Price Alerts</h1>
            <p className="text-muted-foreground">
              Get notified when your favorite cryptocurrencies hit your target price
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Alert
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
            <CardDescription>Set up price alerts for your selected cryptocurrency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Cryptocurrency</Label>
                <Select>
                  <SelectTrigger>
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
                <Label>Target Price (USDT)</Label>
                <Input type="number" placeholder="Enter price" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Alert Type</Label>
              <RadioGroup defaultValue="above" className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="above" id="above" />
                  <Label htmlFor="above">Price goes above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="below" id="below" />
                  <Label htmlFor="below">Price goes below</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Notification Methods</Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="push" />
                  <Label htmlFor="push">Push Notification</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Manage your existing price alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="flex items-center gap-4">
                  <Switch checked={alert.isActive} aria-label="Toggle alert" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{alert.symbol}</h3>
                      <Badge variant={alert.type === "above" ? "default" : "destructive"}>
                        {alert.type === "above" ? "Above" : "Below"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Target: ${alert.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-1">
                    {alert.notifications.includes("email") && (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary">
                        <Mail className="w-4 h-4" />
                      </div>
                    )}
                    {alert.notifications.includes("push") && (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary">
                        <BellRing className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

