import { ApiResponse } from "@/types/api";
import api from "./config";

export type NotificationQueryParams = {
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  paging?: number;
};

export type NotificationResponse = {
  id: string;
  created_at: number;
  content: string;
  is_read: boolean;
};

export const notificationApi = {
  getList: async (
    params: NotificationQueryParams
  ): Promise<ApiResponse<NotificationResponse[]>> => {
    const response = await api.get<ApiResponse<NotificationResponse[]>>(
      "/v1/notifications",
      {
        params,
      }
    );
    return response.data;
  },
};
