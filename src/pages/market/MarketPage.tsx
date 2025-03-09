import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAssetList } from "./hooks/use-asset-list";
import { AssetInfoResponse } from "@/api/asset-api";
import { getCryptoIcon, WS_ENDPOINT } from "@/constants";

export default function MarketPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAssetList({
    sort: "createdAt",
    order: "asc",
    page,
    paging: 20,
    type: "CRYPTO",
  });

  const [assets, setAssets] = useState<AssetInfoResponse[]>([]);
  const [priceChanges, setPriceChanges] = useState<{
    [key: string]: "up" | "down" | null;
  }>({});

  useEffect(() => {
    if (!data?.data) return;
    setAssets(data.data);

    const ws = new WebSocket(WS_ENDPOINT);

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      try {
        const liveData = JSON.parse(event.data);

        if (typeof liveData !== "object" || liveData === null) {
          console.error("Unexpected WebSocket data format:", liveData);
          return;
        }

        setAssets((prevAssets) =>
          prevAssets.map((asset) => {
            const newPrice = liveData[asset.identity.toLowerCase()];
            if (!newPrice) return asset;

            const oldPrice = asset.current_price_usd;
            const priceChange =
              newPrice > oldPrice ? "up" : newPrice < oldPrice ? "down" : null;

            if (priceChange) {
              setPriceChanges((prev) => ({
                ...prev,
                [asset.identity]: priceChange,
              }));

              setTimeout(() => {
                setPriceChanges((prev) => ({
                  ...prev,
                  [asset.identity]: null,
                }));
              }, 500);
            }

            return { ...asset, current_price_usd: newPrice };
          })
        );
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      ws.close();
    };
  }, [data?.data]);

  return (
    <div className="mt-6 p-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Explorer</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <img
                            src={getCryptoIcon(asset.symbol)}
                            alt={asset.name}
                          />
                        </Avatar>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {asset.symbol}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell
                      className={`transition-all duration-500 ${
                        priceChanges[asset.identity] === "up"
                          ? "text-green-500"
                          : priceChanges[asset.identity] === "down"
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {asset.current_price_usd} $
                    </TableCell>

                    <TableCell>
                      <a
                        href={asset.explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full px-2 py-1 text-xs text-green-500"
                      >
                        Open Explorer
                      </a>
                    </TableCell>

                    <TableCell>
                      <Button onClick={() => navigate(`/assets/${asset.id}`)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={data?.meta?.current_page === 1}
            >
              Previous
            </Button>
            <span>
              Page {data?.meta?.current_page} of {data?.meta?.total_pages}
            </span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={data?.meta?.current_page === data?.meta?.total_pages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
