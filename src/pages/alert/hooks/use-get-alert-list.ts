import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import { alertApi, AlertInfoResponse, AlertQueryParams } from "@/api/alert-api";

export const useAlertList = (
  params: AlertQueryParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<AlertInfoResponse[]>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<AlertInfoResponse[]>>({
    ...options,
    queryKey: ["alerts", params],
    queryFn: () => alertApi.getList(params),
  });
};
