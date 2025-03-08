import { useEffect, useState } from "react";

export const useAssetPrice = () => {
  const [priceChanges, setPriceChanges] = useState<{ [key: string]: "up" | "down" | null }>({});
  const [updatedPrices, setUpdatedPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const ws = new WebSocket("wss://marketsentry.site/assets/prices");

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

        setUpdatedPrices((prevPrices) => {
          const newPrices = { ...prevPrices };
          Object.keys(liveData).forEach((symbol) => {
            const newPrice = liveData[symbol];
            const oldPrice = prevPrices[symbol];

            const priceChange =
              oldPrice && newPrice > oldPrice ? "up" : oldPrice && newPrice < oldPrice ? "down" : null;

            newPrices[symbol] = newPrice;

            if (priceChange) {
              setPriceChanges((prev) => ({ ...prev, [symbol]: priceChange }));
              setTimeout(() => {
                setPriceChanges((prev) => ({ ...prev, [symbol]: null }));
              }, 500);
            }
          });

          return newPrices;
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  return { updatedPrices, priceChanges };
};
