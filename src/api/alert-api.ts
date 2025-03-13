import { ApiResponse } from "@/types/api";
import api from "./config";

export type CreateAlertRequest = {
  alert_type: string;
  alert_condition_type: string;
  value: number;
  trigger_type: string;
  expiration_at: string;
  alert_method_types: string[];
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
};
