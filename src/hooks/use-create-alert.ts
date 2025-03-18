import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import {
  alertApi,
  AlertInfoResponse,
  CreateAlertRequest,
} from "@/api/alert-api";

export const useCreateAlert = (
  options?: UseMutationOptions<
    ApiResponse<AlertInfoResponse>,
    Error,
    { assetId: string; data: CreateAlertRequest }
  >
) => {
  return useMutation<
    ApiResponse<AlertInfoResponse>,
    Error,
    { assetId: string; data: CreateAlertRequest }
  >({
    mutationFn: ({ assetId, data }) => alertApi.createAlert(data, assetId),
    ...options,
  });
};
