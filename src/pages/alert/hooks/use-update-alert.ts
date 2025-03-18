import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import {
  alertApi,
  AlertInfoResponse,
  CreateAlertRequest,
} from "@/api/alert-api";

export const useUpdateAlert = (
  options?: UseMutationOptions<
    ApiResponse<AlertInfoResponse>,
    Error,
    { alertId: string; data: CreateAlertRequest }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<AlertInfoResponse>,
    Error,
    { alertId: string; data: CreateAlertRequest }
  >({
    mutationFn: ({ alertId, data }) => alertApi.update(alertId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
    ...options,
  });
};
