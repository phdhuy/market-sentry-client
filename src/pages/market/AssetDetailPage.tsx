import { useEffect, useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCryptoIcon } from "@/constants"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js"
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  BarChart3,
  Coins,
  Bell,
  BellPlus,
  AlertCircle,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQueryClient } from "@tanstack/react-query"
import { useAssetDetail } from "./hooks/use-asset-detail"
import { useCreateAlert } from "./hooks/use-create-alert"
import { useParams } from "react-router-dom"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

export default function AssetDetailPage() {
  const params = useParams()
  const assetId = params.id as string
  const queryClient = useQueryClient()

  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d" | "30d" | "1y">("24h")
  const [newAlertPrice, setNewAlertPrice] = useState("")
  const [newAlertCondition, setNewAlertCondition] = useState<"GREATER_THAN" | "LESS_THAN">("GREATER_THAN")
  const [dialogOpen, setDialogOpen] = useState(false)

  // Fetch asset details
  const { data, isLoading } = useAssetDetail(assetId, { enabled: !!assetId })
  const asset = data?.data

  // Fetch asset alerts
  // const { alerts, isLoading: isLoadingAlerts, toggleAlert, removeAlert } = useAssetAlerts(assetId)

  // Create alert mutation
  const createAlertMutation = useCreateAlert({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts", assetId] })
      setDialogOpen(false)
      alert("Create alert successfull")

      // Reset form
      if (asset) {
        setNewAlertPrice(asset.current_price_usd.toString())
      }
    },
    onError: (error) => {
      alert(`Failed to create alert ${error}`)
    },
  })

  // Set initial price for alert when asset loads
  useEffect(() => {
    if (asset) {
      setNewAlertPrice(asset.current_price_usd.toString())
    }
  }, [asset])

  // Handle adding a new alert
  const handleAddAlert = async () => {
    if (!newAlertPrice || isNaN(Number(newAlertPrice))) {
      alert("Invalid price")
      return
    }

    createAlertMutation.mutate({
      assetId,
      data: {
        alert_type: 'PRICE',
        alert_condition_type: newAlertCondition,
        value: Number(newAlertPrice),
        trigger_type: 'ONLY_ONCE',
        expiration_at: '2025-03-13T16:03:56.636Z',
        alert_method_types: ['EMAIL']
      },
    })
  }

  // // Handle toggling an alert
  // const handleToggleAlert = async (alertId: string) => {
  //   try {
  //     await toggleAlert(alertId)
  //   } catch (error) {
  //     alert("Failed to update alert")
  //   }
  // }

  // // Handle deleting an alert
  // const handleDeleteAlert = async (alertId: string) => {
  //   try {
  //     await removeAlert(alertId)
  //     toast({
  //       title: "Alert deleted",
  //       description: "Your price alert has been removed",
  //     })
  //   } catch (error) {
  //     toast({
  //       title: "Failed to delete alert",
  //       description: error instanceof Error ? error.message : "An unknown error occurred",
  //       variant: "destructive",
  //     })
  //   }
  // }

  // Set current price as alert target
  const setCurrentPriceAsAlert = () => {
    if (!asset) return
    setNewAlertPrice(asset.current_price_usd.toString())
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Button
        variant="ghost"
        className="mb-6 text-muted-foreground hover:text-foreground"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Market
      </Button>

      {isLoading || !asset ? (
        <Card className="border border-border/30 shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {/* Asset Header Card */}
          <Card className="border border-border/30 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-full border-2 border-orange-500/20 bg-background p-2">
                    <img
                      src={asset.logo || getCryptoIcon(asset.symbol)}
                      alt={asset.name}
                      className="h-full w-full object-contain"
                    />
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl">{asset.name}</CardTitle>
                      <Badge variant="outline" className="font-semibold bg-background/50 border border-orange-500/20">
                        {asset.symbol}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-2xl font-bold flex items-center gap-1">
                        $
                        {asset.current_price_usd.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      {/* {asset.price_change_24h_percent !== undefined && (
                        <Badge
                          variant="outline"
                          className={`border ${
                            asset.price_change_24h_percent >= 0
                              ? "border-green-500/30 bg-green-500/5 text-green-600"
                              : "border-red-500/30 bg-red-500/5 text-red-600"
                          }`}
                        >
                          <span className="flex items-center gap-1">
                            {asset.price_change_24h_percent >= 0 ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            {Math.abs(asset.price_change_24h_percent).toFixed(2)}% (24h)
                          </span>
                        </Badge>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10 text-orange-600 hover:text-orange-700"
                      >
                        <BellPlus className="mr-2 h-4 w-4" />
                        Set Alert
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Price Alert</DialogTitle>
                        <DialogDescription>Get notified when {asset.name} reaches your target price.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="alert-condition" className="text-right">
                            Condition
                          </Label>
                          <Select
                            value={newAlertCondition}
                            onValueChange={(value: "GREATER_THAN" | "LESS_THAN") => setNewAlertCondition(value)}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GREATER_THAN">Price goes above</SelectItem>
                              <SelectItem value="LESS_THAN">Price goes below</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            Price (USD)
                          </Label>
                          <div className="col-span-3 flex gap-2">
                            <Input
                              id="price"
                              type="number"
                              value={newAlertPrice}
                              onChange={(e) => setNewAlertPrice(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={setCurrentPriceAsAlert}
                              className="whitespace-nowrap"
                            >
                              Current Price
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleAddAlert}
                          disabled={createAlertMutation.isPending}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {createAlertMutation.isPending ? "Creating..." : "Create Alert"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all border border-orange-600/20">
                    Buy
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-border/50 bg-background/50 hover:border-orange-500/30"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Separator className="bg-border/30" />
            <CardContent className="pt-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-muted/20 rounded-xl p-4 border border-border/30 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <DollarSign className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Market Cap</span>
                  </div>
                  {/* <p className="text-lg font-semibold">${asset.market_cap?.toLocaleString() || "N/A"}</p> */}
                </div>
                <div className="bg-muted/20 rounded-xl p-4 border border-border/30 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <BarChart3 className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">24h Volume</span>
                  </div>
                  {/* <p className="text-lg font-semibold">${asset.volume_24h?.toLocaleString() || "N/A"}</p> */}
                </div>
                <div className="bg-muted/20 rounded-xl p-4 border border-border/30 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Coins className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Circulating Supply</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {/* {asset.circulating_supply?.toLocaleString() || "N/A"} {asset.symbol} */}
                  </p>
                </div>
              </div>

              {/* Price Alerts Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold">Price Alerts</h3>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <BellPlus className="mr-2 h-4 w-4" />
                        New Alert
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Price Alert</DialogTitle>
                        <DialogDescription>Get notified when {asset.name} reaches your target price.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="alert-condition" className="text-right">
                            Condition
                          </Label>
                          <Select
                            value={newAlertCondition}
                            onValueChange={(value: "GREATER_THAN" | "LESS_THAN") => setNewAlertCondition(value)}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="above">Price goes above</SelectItem>
                              <SelectItem value="below">Price goes below</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            Price (USD)
                          </Label>
                          <div className="col-span-3 flex gap-2">
                            <Input
                              id="price"
                              type="number"
                              value={newAlertPrice}
                              onChange={(e) => setNewAlertPrice(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={setCurrentPriceAsAlert}
                              className="whitespace-nowrap"
                            >
                              Current Price
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleAddAlert}
                          disabled={createAlertMutation.isPending}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {createAlertMutation.isPending ? "Creating..." : "Create Alert"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* {isLoadingAlerts ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-muted/20"
                      >
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-40 mb-2" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-10 rounded-full" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : alerts && alerts.length > 0 ? (
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          alert.active
                            ? alert.condition === "above"
                              ? "border-green-500/30 bg-green-500/5"
                              : "border-red-500/30 bg-red-500/5"
                            : "border-border/30 bg-muted/20 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              alert.active
                                ? alert.condition === "above"
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-red-500/10 text-red-500"
                                : "bg-muted/30 text-muted-foreground"
                            }`}
                          >
                            {alert.condition === "above" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {alert.condition === "above" ? "Price goes above" : "Price goes below"} $
                              {alert.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {alert.condition === "above"
                                ? asset.current_price_usd < alert.price
                                  ? `$${(alert.price - asset.current_price_usd).toFixed(2)} away from current price`
                                  : "Alert condition met"
                                : asset.current_price_usd > alert.price
                                  ? `$${(asset.current_price_usd - alert.price).toFixed(2)} away from current price`
                                  : "Alert condition met"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={alert.active} onCheckedChange={() => handleToggleAlert(alert.id)} />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            onClick={() => handleDeleteAlert(alert.id)}
                          >
                            <AlertTriangle className="h-4 w-4" />
                            <span className="sr-only">Delete alert</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : ( */}
                  <div className="text-center p-6 border border-dashed border-border/50 rounded-xl bg-muted/10">
                    <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <h4 className="text-lg font-medium mb-1">No price alerts set</h4>
                    <p className="text-muted-foreground mb-4">
                      Create an alert to get notified when price reaches your target
                    </p>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          <BellPlus className="mr-2 h-4 w-4" />
                          Create Your First Alert
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create Price Alert</DialogTitle>
                          <DialogDescription>
                            Get notified when {asset.name} reaches your target price.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="alert-condition" className="text-right">
                              Condition
                            </Label>
                            <Select
                              value={newAlertCondition}
                              onValueChange={(value: "GREATER_THAN" | "LESS_THAN") => setNewAlertCondition(value)}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="GREATER_THAN">Price goes above</SelectItem>
                                <SelectItem value="LESS_THAN">Price goes below</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                              Price (USD)
                            </Label>
                            <div className="col-span-3 flex gap-2">
                              <Input
                                id="price"
                                type="number"
                                value={newAlertPrice}
                                onChange={(e) => setNewAlertPrice(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={setCurrentPriceAsAlert}
                                className="whitespace-nowrap"
                              >
                                Current Price
                              </Button>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleAddAlert}
                            disabled={createAlertMutation.isPending}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            {createAlertMutation.isPending ? "Creating..." : "Create Alert"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                {/* )} */}
              </div>

              {/* Price Chart */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold">Price Chart</h3>
                  </div>
                  <Tabs value={timeframe} className="w-auto">
                    <TabsList className="bg-muted/20 p-1 border border-border/30 rounded-lg">
                      {(["1h", "24h", "7d", "30d", "1y"] as const).map((tf) => (
                        <TabsTrigger
                          key={tf}
                          value={tf}
                          onClick={() => setTimeframe(tf)}
                          className="px-3 py-1.5 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
                        >
                          {tf}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                <div className="bg-muted/20 p-4 rounded-xl border border-border/30">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current</div>
                      <div className="text-xl font-bold">${asset.current_price_usd.toLocaleString()}</div>
                    </div>
                    {/* <div className="text-right">
                      <div className="text-sm text-muted-foreground">All Time High</div>
                      <div className="text-xl font-bold flex items-center justify-end gap-1">
                        ${asset.all_time_high?.toLocaleString() || "N/A"}
                        <Info
                          className="h-4 w-4 text-muted-foreground cursor-help"
                          title={
                            asset.all_time_high_date
                              ? `Reached on ${new Date(asset.all_time_high_date).toLocaleDateString()}`
                              : "No data available"
                          }
                        />
                      </div>
                    </div> */}
                  </div>

                  <div className="flex items-center justify-center h-[300px]">
                    <div className="text-center">
                      <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <h4 className="text-lg font-medium mb-1">Price chart coming soon</h4>
                      <p className="text-muted-foreground">
                        Historical price data will be available in the next update
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/30 pt-4 flex justify-between">
              <Button
                variant="outline"
                className="border border-border/50 bg-background/50 hover:border-orange-500/30"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Market
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all border border-orange-600/20">
                Trade {asset.symbol}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}