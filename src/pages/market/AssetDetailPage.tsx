import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCryptoIcon } from "@/constants";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface FakeAssetInfo {
  name: string;
  symbol: string;
  identity: string;
  current_price_usd: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
}

export default function AssetDetailPage() {
  const [asset, setAsset] = useState<FakeAssetInfo | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const fakeAsset: FakeAssetInfo = {
      name: "Bitcoin",
      symbol: "BTC",
      identity: "bitcoin",
      current_price_usd: 45000,
      market_cap: 850000000000,
      volume_24h: 25000000000,
      circulating_supply: 19000000,
    };
    setAsset(fakeAsset);

    const fakePrices = Array.from(
      { length: 20 },
      () => 45000 + Math.random() * 2000 - 1000
    );
    setPriceHistory(fakePrices);

    const interval = setInterval(() => {
      setAsset((prev) => {
        if (!prev) return prev;

        const newPrice = prev.current_price_usd + (Math.random() * 100 - 50);
        setPriceChange(newPrice > prev.current_price_usd ? "up" : "down");

        setPriceHistory((prevHistory) => [...prevHistory.slice(1), newPrice]);

        return { ...prev, current_price_usd: parseFloat(newPrice.toFixed(2)) };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!asset) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="mt-10 p-10 text-white flex items-center justify-center">
      <Card className="bg-gray-800 shadow-lg p-6 rounded-xl w-full max-w-2xl">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 bg-gray-700 rounded-full p-2">
            <img
              src={getCryptoIcon(asset.symbol)}
              alt={asset.name}
              className="h-full w-full"
            />
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {asset.name} ({asset.symbol})
            </h2>
            <p
              className={`text-xl font-semibold transition-all ${
                priceChange === "up"
                  ? "text-green-400"
                  : priceChange === "down"
                  ? "text-red-400"
                  : ""
              }`}
            >
              ${asset.current_price_usd.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-semibold text-gray-300">Market Info</h3>
          <p className="text-gray-400">
            Market Cap:{" "}
            <span className="font-medium">
              ${asset.market_cap.toLocaleString()}
            </span>
          </p>
          <p className="text-gray-400">
            24h Volume:{" "}
            <span className="font-medium">
              ${asset.volume_24h.toLocaleString()}
            </span>
          </p>
          <p className="text-gray-400">
            Circulating Supply:{" "}
            <span className="font-medium">
              {asset.circulating_supply.toLocaleString()} {asset.symbol}
            </span>
          </p>
        </div>

        {/* Price Chart */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-300">Price Trend</h3>
          <div className="bg-gray-700 p-4 rounded-xl">
            <Line
              data={{
                labels: Array.from({ length: priceHistory.length }, (_, i) =>
                  (i + 1).toString()
                ),
                datasets: [
                  {
                    label: "Price (USD)",
                    data: priceHistory,
                    borderColor: "#ff9800",
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    tension: 0.2,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: { title: { display: true, text: "Time", color: "#ccc" } },
                  y: {
                    title: {
                      display: true,
                      text: "Price (USD)",
                      color: "#ccc",
                    },
                  },
                },
                plugins: {
                  legend: { labels: { color: "#ccc" } },
                },
              }}
            />
          </div>
        </div>

        <Button
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg"
          onClick={() => window.history.back()}
        >
          Back to Market
        </Button>
      </Card>
    </div>
  );
}
