import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0d0d0d] text-white">
      <img
        src="/auth_layout_bg.jpg"
        alt="Crypto Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative w-full max-w-md p-6 rounded-xl shadow-lg bg-opacity-20 backdrop-blur-lg border border-gray-700">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
