"use client"

import { useEffect, useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCryptoIcon } from "@/constants"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js"
import { ArrowLeft, ArrowUp, ArrowDown, TrendingUp, DollarSign, BarChart3, Coins } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

interface FakeAssetInfo {
  name: string
  symbol: string
  identity: string
  current_price_usd: number
  market_cap: number
  volume_24h: number
  circulating_supply: number
  price_change_24h_percent: number
}

export default function AssetDetailPage() {
  const [asset, setAsset] = useState<FakeAssetInfo | null>(null)
  const [priceHistory, setPriceHistory] = useState<number[]>([])
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null)
  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d" | "30d">("24h")

  useEffect(() => {
    // Simulate loading delay
    const loadingTimeout = setTimeout(() => {
      const fakeAsset: FakeAssetInfo = {
        name: "Bitcoin",
        symbol: "BTC",
        identity: "bitcoin",
        current_price_usd: 45000,
        market_cap: 850000000000,
        volume_24h: 25000000000,
        circulating_supply: 19000000,
        price_change_24h_percent: 2.34,
      }
      setAsset(fakeAsset)

      const fakePrices = Array.from({ length: 20 }, () => 45000 + Math.random() * 2000 - 1000)
      setPriceHistory(fakePrices)
    }, 800)

    const interval = setInterval(() => {
      setAsset((prev) => {
        if (!prev) return prev

        const newPrice = prev.current_price_usd + (Math.random() * 100 - 50)
        setPriceChange(newPrice > prev.current_price_usd ? "up" : "down")

        // Clear the price change indicator after 1 second
        setTimeout(() => setPriceChange(null), 1000)

        setPriceHistory((prevHistory) => [...prevHistory.slice(1), newPrice])

        return { ...prev, current_price_usd: Number.parseFloat(newPrice.toFixed(2)) }
      })
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimeout)
    }
  }, [])

  // Generate time labels based on selected timeframe
  const getTimeLabels = () => {
    switch (timeframe) {
      case "1h":
        return Array.from({ length: priceHistory.length }, (_, i) => `${i * 3}m`)
      case "24h":
        return Array.from({ length: priceHistory.length }, (_, i) => `${i + 5}:00`)
      case "7d":
        return Array.from({ length: priceHistory.length }, (_, i) => `Day ${Math.floor(i / 3) + 1}`)
      case "30d":
        return Array.from({ length: priceHistory.length }, (_, i) => `Week ${Math.floor(i / 5) + 1}`)
      default:
        return Array.from({ length: priceHistory.length }, (_, i) => `${i + 1}`)
    }
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

      {!asset ? (
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
          <Card className="border border-border/30 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-full border-2 border-orange-500/20 bg-background p-2">
                    <img
                      src={getCryptoIcon(asset.symbol) || "/placeholder.svg"}
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
                      <div
                        className={`text-2xl font-bold transition-all duration-500 flex items-center gap-1 ${
                          priceChange === "up" ? "text-green-500" : priceChange === "down" ? "text-red-500" : ""
                        }`}
                      >
                        $
                        {asset.current_price_usd.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
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
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-muted/20 rounded-xl p-4 border border-border/30 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <DollarSign className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Market Cap</span>
                  </div>
                  <p className="text-lg font-semibold">${asset.market_cap.toLocaleString()}</p>
                </div>
                <div className="bg-muted/20 rounded-xl p-4 border border-border/30 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <BarChart3 className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">24h Volume</span>
                  </div>
                  <p className="text-lg font-semibold">${asset.volume_24h.toLocaleString()}</p>
                </div>
                <div className="bg-muted/20 rounded-xl p-4 border border-border/30 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Coins className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Circulating Supply</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {asset.circulating_supply.toLocaleString()} {asset.symbol}
                  </p>
                </div>
              </div>

              {/* Price Chart */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold">Price Chart</h3>
                  </div>
                  <div className="flex gap-1">
                    {(["1h", "24h", "7d", "30d"] as const).map((tf) => (
                      <Button
                        key={tf}
                        variant={timeframe === tf ? "default" : "outline"}
                        size="sm"
                        className={
                          timeframe === tf
                            ? "bg-orange-500 hover:bg-orange-600 text-white border border-orange-600/20"
                            : "border border-border/50 bg-background/50 hover:border-orange-500/30"
                        }
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="bg-muted/20 p-4 rounded-xl border border-border/30">
                  <Line
                    data={{
                      labels: getTimeLabels(),
                      datasets: [
                        {
                          label: "Price (USD)",
                          data: priceHistory,
                          borderColor: "#f97316", // orange-500
                          backgroundColor: "rgba(249, 115, 22, 0.1)",
                          tension: 0.3,
                          borderWidth: 2,
                          pointRadius: 2,
                          pointHoverRadius: 5,
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      aspectRatio: 2,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            color: "rgba(255, 255, 255, 0.1)",
                          },
                          ticks: {
                            color: "rgba(156, 163, 175, 1)",
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 8,
                          },
                        },
                        y: {
                          grid: {
                            color: "rgba(156, 163, 175, 0.1)",
                          },
                          ticks: {
                            color: "rgba(156, 163, 175, 1)",
                          },
                          beginAtZero: false,
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: "rgba(17, 24, 39, 0.8)",
                          titleColor: "rgba(255, 255, 255, 1)",
                          bodyColor: "rgba(255, 255, 255, 1)",
                          borderColor: "rgba(249, 115, 22, 0.5)",
                          borderWidth: 1,
                          padding: 10,
                          displayColors: false,
                          callbacks: {
                            label: (context) => {
                              const value = context.raw as number;
                              return `$${value.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`;
                            },
                          },
                        },
                      },
                      interaction: {
                        intersect: false,
                        mode: "index",
                      },
                      elements: {
                        point: {
                          backgroundColor: "#f97316",
                        },
                      },
                    }}
                  />
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