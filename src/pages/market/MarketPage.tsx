import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAssetList } from "./hooks/use-asset-list"
import type { AssetInfoResponse } from "@/api/asset-api"
import { getCryptoIcon, WS_ENDPOINT } from "@/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ExternalLink, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [order, setOrder] = useState<"asc" | "desc">("asc")

  const { data, isLoading } = useAssetList({
    sort: sortBy,
    order: order,
    page,
    paging: 20,
    type: "CRYPTO",
  })

  const [assets, setAssets] = useState<AssetInfoResponse[]>([])
  const priceChangesRef = useRef<{
    [key: string]: "up" | "down" | null
  }>({})
  const [, forceUpdate] = useState({})

  // Store the initial data when it loads
  useEffect(() => {
    if (!data?.data) return
    setAssets(data.data)
  }, [data?.data])

  // WebSocket connection for live price updates
  useEffect(() => {
    if (assets.length === 0) return

    const ws = new WebSocket(WS_ENDPOINT)

    ws.onopen = () => console.log("WebSocket connected")

    ws.onmessage = (event) => {
      try {
        const liveData = JSON.parse(event.data)

        if (typeof liveData !== "object" || liveData === null) {
          console.error("Unexpected WebSocket data format:", liveData)
          return
        }

        // Update only the price values without changing the entire assets array structure
        setAssets((prevAssets) =>
          prevAssets.map((asset) => {
            const newPrice = liveData[asset.identity.toLowerCase()]
            if (!newPrice) return asset

            const oldPrice = asset.current_price_usd
            const priceChange = newPrice > oldPrice ? "up" : newPrice < oldPrice ? "down" : null

            if (priceChange) {
              // Use ref to avoid re-renders of the entire component
              priceChangesRef.current = {
                ...priceChangesRef.current,
                [asset.identity]: priceChange,
              }

              // Force update just to trigger the animation
              forceUpdate({})

              // Clear the price change indicator after animation completes
              setTimeout(() => {
                priceChangesRef.current = {
                  ...priceChangesRef.current,
                  [asset.identity]: null,
                }
                forceUpdate({})
              }, 500)
            }

            // Only update the price field, keeping all other properties the same
            return {
              ...asset,
              current_price_usd: newPrice,
            }
          }),
        )
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    ws.onerror = (error) => console.error("WebSocket Error:", error)
    ws.onclose = () => console.log("WebSocket disconnected")

    return () => {
      ws.close()
    }
  }, [assets.length])

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Price display component to isolate re-renders
  const PriceDisplay = ({ asset }: { asset: AssetInfoResponse }) => {
    const priceChange = priceChangesRef.current[asset.identity]

    return (
      <div
        className={`font-medium transition-all duration-500 flex items-center gap-1 ${
          priceChange === "up" ? "text-green-500" : priceChange === "down" ? "text-red-500" : ""
        }`}
      >$
        {asset.current_price_usd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crypto Market</h1>
          <p className="text-muted-foreground mt-1">Live prices and market data for cryptocurrencies</p>
        </div>
      </div>

      <Card className="border-border/40 shadow-sm mb-6">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl">Market Overview</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  className="pl-9 border-border/60 bg-background/50 focus-visible:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px] border-border/60 bg-background/50 focus:ring-orange-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Date Added</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="current_price_usd">Price</SelectItem>
                </SelectContent>
              </Select>
              <Select value={order} onValueChange={(value: "asc" | "desc") => setOrder(value)}>
                <SelectTrigger className="w-full sm:w-[120px] border-border/60 bg-background/50 focus:ring-orange-500">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-medium text-foreground">Asset</TableHead>
                    <TableHead className="font-medium text-foreground">Price (USD)</TableHead>
                    <TableHead className="font-medium text-foreground">Explorer</TableHead>
                    <TableHead className="font-medium text-foreground w-[120px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <TableRow key={asset.id} className="group hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-border/40 bg-background">
                              <img
                                src={getCryptoIcon(asset.symbol)}
                                alt={asset.name}
                                className="object-contain"
                              />
                            </Avatar>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <PriceDisplay asset={asset} />
                        </TableCell>

                        <TableCell>
                          <a
                            href={asset.explorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 transition-colors"
                          >
                            Explorer
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>

                        <TableCell>
                          <Button
                            onClick={() => navigate(`/assets/${asset.id}`)}
                            className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all h-9"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-32 text-muted-foreground">
                        {searchQuery ? "No matching assets found" : "No data available"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {!isLoading && data?.meta && (
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={data.meta.current_page === 1}
            className="border-border/60 bg-background/50"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Page</span>
            <span className="font-medium text-sm">{data.meta.current_page}</span>
            <span className="text-sm text-muted-foreground">of</span>
            <span className="font-medium text-sm">{data.meta.total_pages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={data.meta.current_page === data.meta.total_pages}
            className="border-border/60 bg-background/50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}