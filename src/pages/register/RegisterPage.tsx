import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("User Registered:", data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Create Account</h2>
      <p className="text-center opacity-80">Join us today!</p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your full name"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Create a password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center opacity-70 hover:opacity-100 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button type="submit" className="w-full bg-primary text-white p-2 rounded-md hover:opacity-80 transition">
          Sign Up
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