import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";
import { authApi, LoginRequest, TokenResponse } from "@/api/auth-api";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginForm = InferType<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(schema) });

  const loginMutation = useMutation<
    ApiResponse<TokenResponse>,
    AxiosError<{ message?: string }>,
    LoginRequest
  >({
    mutationFn: async (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      console.log("User Login:", data);
      alert("Login successful!");
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      navigate("/market");
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed!");
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <p className="text-center opacity-80">
        Welcome back! Please login to continue.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-md hover:opacity-80 transition"
          disabled={loginMutation.isPending} // Disable button while loading
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
