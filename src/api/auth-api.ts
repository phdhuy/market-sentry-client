import api from "@/api/config";
import { ApiResponse } from "@/types/api";

export type RegisterRequest = {
  email: string;
  password: string;
  confirm_password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export const authApi = {
  register: async (body: RegisterRequest): Promise<ApiResponse<any>> => {
    const response = await api.post("/v1/auth/sign-up", body);
    return response.data;
  },

  login: async (body: LoginRequest): Promise<ApiResponse<any>> => {
    const response = await api.post("/v1/auth/sign-in", body);
    return response.data;
  },

  refreshToken: async (
    body: RefreshTokenRequest
  ): Promise<ApiResponse<any>> => {
    const response = await api.post("/v1/auth/refresh-token", body);
    return response.data;
  },
};
