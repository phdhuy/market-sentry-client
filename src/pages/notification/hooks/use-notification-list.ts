import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import {
  notificationApi,
  NotificationQueryParams,
  NotificationResponse,
} from "@/api/notification-api";

export const useNotificationList = (
  params: NotificationQueryParams,
  options?: Omit<UseQueryOptions<ApiResponse<NotificationResponse[]>>, "queryKey" | "queryFn">
) => {
  return useQuery<ApiResponse<NotificationResponse[]>>({
    ...options,
    queryKey: ["notifications", params],
    queryFn: () => notificationApi.getList(params),
  });
};
