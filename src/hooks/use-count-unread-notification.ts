import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import {
  CountUnreadNotificationRespone,
  notificationApi,
} from "@/api/notification-api";

export const useCountUnreadNotification = (
  options?: Omit<
    UseQueryOptions<ApiResponse<CountUnreadNotificationRespone>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<CountUnreadNotificationRespone>>({
    ...options,
    queryKey: ["count-unread-notification"],
    queryFn: () => notificationApi.countUnread(),
  });
};
