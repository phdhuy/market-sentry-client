import api from "@/api/config";

export const getListAsset = async (params = {}) => {
  try {
    const response = await api.get("/v1/assets", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};
