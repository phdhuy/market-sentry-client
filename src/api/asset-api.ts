import api from "@/api/config";
import { ApiResponse } from "@/types/api";

export type AssetQueryParams = {
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  paging?: number;
  type?: string;
  q?: string;
  category?: string;
};

export type AssetPriceHistoryQueryParams = {
  asset_id: string;
  interval: string;
};

export type AssetInfoResponse = {
  id: string;
  identity: string;
  symbol: string;
  name: string;
  explorer: string;
  current_price_usd: number;
  asset_type: string;
  logo: string;
};


export type AssetType = "CRYPTO" | "STOCK";


export const assetApi = {
  getList: async (
    params: AssetQueryParams
  ): Promise<ApiResponse<AssetInfoResponse[]>> => {
    const response = await api.get<ApiResponse<AssetInfoResponse[]>>(
      "/v1/assets",
      { params }
    );
    return response.data;
  },

  getDetail: async (
    assetId: string
  ): Promise<ApiResponse<AssetInfoResponse>> => {
    const response = await api.get<ApiResponse<AssetInfoResponse>>(
      `/v1/assets/${assetId}`
    );
    return response.data;
  },
};
