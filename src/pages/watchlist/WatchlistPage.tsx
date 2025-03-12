"use client"

import { Plus, ArrowUpDown, Search, Star, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change: number
  tech: number
}

const watchlistData: WatchlistItem[] = [
  { symbol: "S", name: "Sprint Corporation", price: 7.82, change: 54.62, tech: 4.9 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 1088.0, change: -10.18, tech: 1.56 },
  { symbol: "FB", name: "Facebook Inc.", price: 147.0, change: -14.11, tech: 4.9 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 142.49, change: -2.89, tech: 1.56 },
  { symbol: "F", name: "Ford Motor Company", price: 4.51, change: -52.08, tech: 1.56 },
  { symbol: "EQM", name: "EQM Midstream Partners, LP", price: 147.0, change: -14.11, tech: 4.9 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 142.49, change: 2.18, tech: 1.56 },
]

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = watchlistData.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Watchlists</h1>
          <p className="text-muted-foreground mt-1">Track your favorite stocks and cryptocurrencies</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Create new watchlist
        </Button>
      </div>

      <Tabs defaultValue="watchlist1" className="space-y-6">
        <div className="flex items-center border-b pb-1">
          <TabsList className="bg-transparent h-auto p-0 rounded-none">
            <TabsTrigger
              value="watchlist1"
              className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-4 py-2 h-10"
            >
              My Watchlist #1
            </TabsTrigger>
            <TabsTrigger
              value="tech"
              className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-4 py-2 h-10"
            >
              Tech Basket
            </TabsTrigger>
            <TabsTrigger
              value="winners"
              className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-4 py-2 h-10"
            >
              Winnerlist
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="watchlist1" className="mt-0">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="pb-3 border-b">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                    <h2 className="text-xl font-semibold">My Watchlist</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">82 items</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search symbols..."
                    className="pl-9 border-border/60 bg-background/50 focus-visible:ring-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-medium text-foreground">
                        <Button variant="ghost" size="sm" className="font-medium p-0 h-auto">
                          Symbol
                          <ArrowUpDown className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </TableHead>
                      <TableHead className="font-medium text-foreground">
                        <Button variant="ghost" size="sm" className="font-medium p-0 h-auto">
                          Name
                          <ArrowUpDown className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right font-medium text-foreground">
                        <Button variant="ghost" size="sm" className="font-medium p-0 h-auto ml-auto">
                          Price
                          <ArrowUpDown className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right font-medium text-foreground">
                        <Button variant="ghost" size="sm" className="font-medium p-0 h-auto ml-auto">
                          % Change
                          <ArrowUpDown className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right font-medium text-foreground">
                        <Button variant="ghost" size="sm" className="font-medium p-0 h-auto ml-auto">
                          Tech
                          <ArrowUpDown className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                          No matching items found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((item) => (
                        <TableRow key={item.symbol} className="group hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <Badge variant="outline" className="font-semibold bg-background border-border/60">
                              {item.symbol}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{item.name}</TableCell>
                          <TableCell className="text-right font-medium">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div
                              className={`inline-flex items-center gap-1 font-medium ${
                                item.change >= 0 ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {item.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                              {Math.abs(item.change).toFixed(2)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">{item.tech}</TableCell>
                          <TableCell className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tech" className="mt-0">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                    <h2 className="text-xl font-semibold">Tech Basket</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">4 items</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-center text-muted-foreground">
              Select "Tech Basket" to view technology stocks
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="winners" className="mt-0">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                    <h2 className="text-xl font-semibold">Winnerlist</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">12 items</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-center text-muted-foreground">
              Select "Winnerlist" to view top performing stocks
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}