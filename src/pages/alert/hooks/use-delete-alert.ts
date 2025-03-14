import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertApi } from "@/api/alert-api";

export const useDeleteAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alertId: string) => alertApi.delete(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
};
