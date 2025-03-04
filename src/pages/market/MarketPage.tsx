import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getListAsset } from "@/services/asset";

const getCryptoIcon = (symbol: string) =>
  `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

export default function MarketPage() {
  const [vaults, setVaults] = useState<any[]>([]);
  const [priceChanges, setPriceChanges] = useState<{
    [key: string]: "up" | "down" | null;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const wsEndpoint = "ws://103.151.53.134:8081/assets/prices";

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getListAsset({
          sort: "createdAt",
          order: "asc",
          page: 1,
          paging: 20,
          type: "CRYPTO",
        });

        if (Array.isArray(data.data)) {
          setVaults(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();

    const ws = new WebSocket(wsEndpoint);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const liveData = JSON.parse(event.data);

        if (typeof liveData !== "object" || liveData === null) {
          console.error("Unexpected WebSocket data format:", liveData);
          return;
        }

        console.log("Received WebSocket Data:", liveData);

        setVaults((prevVaults) => {
          return prevVaults.map((vault) => {
            const newPrice = liveData[vault.identity.toLowerCase()];
            if (!newPrice) return vault;

            const oldPrice = vault.current_price_usd;
            const priceChange =
              newPrice > oldPrice ? "up" : newPrice < oldPrice ? "down" : null;

            if (priceChange) {
              setPriceChanges((prev) => ({
                ...prev,
                [vault.identity]: priceChange,
              }));

              // Remove color after 0.5s
              setTimeout(() => {
                setPriceChanges((prev) => ({
                  ...prev,
                  [vault.identity]: null,
                }));
              }, 500);
            }

            return {
              ...vault,
              current_price_usd: newPrice,
            };
          });
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  return (
    <div className="mt-6 p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Explorer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaults.length > 0 ? (
              vaults.map((vault) => (
                <TableRow key={vault.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <img
                          src={getCryptoIcon(vault.symbol)}
                          alt={vault.name}
                        />
                      </Avatar>
                      <div>
                        <div className="font-medium">{vault.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {vault.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell
                    className={`transition-all duration-500 ${
                      priceChanges[vault.identity] === "up"
                        ? "text-green-500"
                        : priceChanges[vault.identity] === "down"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {vault.current_price_usd} $
                  </TableCell>

                  <TableCell>
                    <a
                      href={vault.explorer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        vault.state === "Fixed"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      Open Explorer
                    </a>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
