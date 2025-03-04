import { Plus, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  return (
    <div className="mt-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Watchlists</h1>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create new watchlist
            </Button>
          </div>

          <Tabs defaultValue="watchlist1" className="space-y-6">
            <div className="flex items-center gap-2 border-b">
              <TabsList>
                <TabsTrigger value="watchlist1">My Watchlist #1</TabsTrigger>
                <TabsTrigger value="tech">Tech Basket</TabsTrigger>
                <TabsTrigger value="winners">Winnerlist</TabsTrigger>
              </TabsList>
            </div>

            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">My Watchlist</h2>
                    <p className="text-sm text-muted-foreground">82 items</p>
                  </div>
                  <Input placeholder="Search symbols..." className="w-64" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Symbol
                      <ArrowUpDown className="w-4 h-4 ml-1 inline-block" />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">% Change</TableHead>
                    <TableHead className="text-right">Tech</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {watchlistData.map((item) => (
                    <TableRow key={item.symbol}>
                      <TableCell className="font-medium">{item.symbol}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className={`text-right ${item.change >= 0 ? "text-green-500" : "text-destructive"}`}>
                        {item.change >= 0 ? "+" : ""}
                        {item.change}%
                      </TableCell>
                      <TableCell className="text-right">{item.tech}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
    </div>
  )
}