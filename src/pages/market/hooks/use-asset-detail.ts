import { assetApi, AssetInfoResponse } from "@/api/asset-api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";

export const useAssetDetail = (
  assetId: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<AssetInfoResponse>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<AssetInfoResponse>>({
    ...options,
    queryKey: ["assetDetail", assetId],
    queryFn: () => assetApi.getDetail(assetId),
    enabled: !!assetId,
  });
};