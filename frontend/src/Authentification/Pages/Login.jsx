import React, { useState } from "react";
import { LoginService } from "../Services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ValidationErrorMsg from "../components/ValidationErrorMsg";
import { toast } from "react-toastify";

const Login = ({ isFlipped, setIsFlipped }) => {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };


  const mutation = useMutation({
    mutationFn: LoginService,
    onSuccess: () => {
      navigate("/admin/dashboard")
    },
    onError: (error) => {
     toast.error(error?.response?.data?.message, {
    duration: 4000,
    position: "top-right",
    icon: "⚠️",
    style: {
        background: "#fff",
        color: "#18181b",
        border: "1px solid #fecaca",
        borderRadius: "14px",
        padding: "14px 18px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
        fontSize: "14px",
        fontWeight: "600",
    },
});
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(userData);
  };

  return (
    <div className="absolute inset-0 p-8 flex flex-col justify-center [backface-visibility:hidden]">
      <h1 className="mb-3 text-center text-4xl font-bold text-gray-800">
        Welcome to <span className="text-[#C25E0A]">Goldstar</span>
      </h1>
      <p className="mb-8 text-center text-sm text-gray-500">
        Please enter your login information
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-[#DCDCDC]/30 p-3 text-sm transition focus:border-[#C25E0A] focus:outline-none focus:ring-1 focus:ring-[#C25E0A]"
            placeholder="Entrer votre email"
          />
          {mutation.error?.response?.data?.errors?.email && (
            <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.email} />
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-[#DCDCDC]/30 p-3 text-sm transition focus:border-[#C25E0A] focus:outline-none focus:ring-1 focus:ring-[#C25E0A]"
            placeholder="••••••••"
          />
          {mutation.error?.response?.data?.errors?.password && (
            <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.password} />
          )}
        </div>
        <div className="text-center">
        </div>

        <div className="text-right">
          <Link
            to="/forget-password"
            className="text-sm font-medium text-[#C25E0A] hover:underline"
          >
            Forgot Password ?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-[#C25E0A] py-3 mt-2 font-semibold text-white shadow-md shadow-[#C25E0A]/30 transition hover:bg-[#E6C200] hover:shadow-lg active:scale-[0.98]"
        >
          Login
        </button>

        <p className="pt-4 text-center text-sm text-gray-600">
          Don't have an account ?{" "}
          <button type="button" className="font-bold text-[#C25E0A] hover:underline ml-1" onClick={() => setIsFlipped(!isFlipped)}>
            Register Now
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;