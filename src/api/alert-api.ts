import { ApiResponse } from "@/types/api";
import api from "./config";
import { AssetInfoResponse } from "./asset-api";

export type CreateAlertRequest = {
  alert_type: string;
  alert_condition_type: string;
  value: number;
  trigger_type: string;
  expiration_at: string;
  alert_method_types: string[];
};

export type AlertQueryParams = {
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  paging?: number;
};

export type AlertInfoResponse = {
  id: string;
  created_at: number;
  updated_at: number;
  alert_type: string;
  alert_condition_type: string;
  value: number;
  trigger_type: string;
  alert_method_types: string[];
  alert_status: string;
  expiration_at: number;
  asset: AssetInfoResponse;
};

export const alertApi = {
  createAlert: async (
    body: CreateAlertRequest,
    assetId: string
  ): Promise<ApiResponse<AlertInfoResponse>> => {
    const response = await api.post<ApiResponse<AlertInfoResponse>>(
      `/v1/assets/${assetId}/alerts`,
      body
    );
    return response.data;
  },

  getList: async (
    params: AlertQueryParams
  ): Promise<ApiResponse<AlertInfoResponse[]>> => {
    const response = await api.get<ApiResponse<AlertInfoResponse[]>>(
      `/v1/alerts`,
      { params }
    );
    return response.data;
  },

  getDetail: async (
    alertId: string
  ): Promise<ApiResponse<AlertInfoResponse>> => {
    const response = await api.get<ApiResponse<AlertInfoResponse>>(
      `/v1/alerts/${alertId}`
    );
    return response.data;
  },

  delete: async (alertId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      `/v1/alerts/${alertId}`
    );
    return response.data;
  },

  update: async (
    alertId: string,
    body: CreateAlertRequest
  ): Promise<ApiResponse<AlertInfoResponse>> => {
    const response = await api.put<ApiResponse<AlertInfoResponse>>(
      `/v1/alerts/${alertId}`,
      body
    );
    return response.data;
  },
};
