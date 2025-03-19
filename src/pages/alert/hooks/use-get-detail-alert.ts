import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import { alertApi, AlertInfoResponse } from "@/api/alert-api";

export const useGetDetailAlert = (
  alertId: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<AlertInfoResponse>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<AlertInfoResponse>>({
    ...options,
    queryKey: ["alert", alertId],
    queryFn: () => alertApi.getDetail(alertId),
  });
};
