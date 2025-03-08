import { assetApi, AssetInfoResponse, AssetQueryParams } from "@/api/asset-api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";

export const useAssetList = (
  params: AssetQueryParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<AssetInfoResponse[]>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<AssetInfoResponse[]>>({
    ...options,
    queryKey: ["assets", params],
    queryFn: () => assetApi.getList(params),
  });
};
