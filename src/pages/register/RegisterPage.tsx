import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { authApi, RegisterRequest, RegisterResponse } from "@/api/auth-api";
import { ApiResponse } from "@/types/api";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation<
    ApiResponse<RegisterResponse>,
    AxiosError<{ message?: string }>,
    RegisterRequest
  >({
    mutationFn: async (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      console.log("User Registered:", data);
      alert("Registration successful!");
      navigate("/login");
    },
    onError: (error) => {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed!");
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Create Account</h2>
      <p className="text-center opacity-80">Join us today!</p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900"
            placeholder="Enter your email"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900"
              placeholder="Create a password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="black" />
              ) : (
                <Eye size={20} color="black" />
              )}
            </button>
          </div>
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="black" />
              ) : (
                <Eye size={20} color="black" />
              )}{" "}
            </button>
          </div>
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-md hover:opacity-80 transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Registering..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
