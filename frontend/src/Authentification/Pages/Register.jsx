import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterService } from "../Services/AuthService";
import { toast } from "react-toastify";
import ValidationErrorMsg from "../components/ValidationErrorMsg";


const Register = ({ isFlipped, setIsFlipped }) => {
  const [userData, setUserData] = useState({
    f_name: "", l_name: "", email: "", password: "", password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }))
  };

  const mutation = useMutation({
    mutationFn: RegisterService,
    onSuccess: (data) => {
      setIsFlipped(!isFlipped)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(userData);
  };

  return (
    <div className="absolute inset-0 p-8 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <h1 className="mb-3 text-center text-4xl font-bold text-gray-800">
        Welcome to <span className="text-[#C25E0A]">Goldstar</span>
      </h1>
      <p className="mb-6 text-center text-sm text-gray-500">
        Please enter your information to create your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="f_name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="f_name" id="f_name" value={userData.f_name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-[#DCDCDC]/30 p-2.5 text-sm transition focus:border-[#C25E0A] focus:outline-none focus:ring-1 focus:ring-[#C25E0A]" placeholder="Your first name" />
            {mutation.error?.response?.data?.errors?.f_name && (
              <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.f_name} />
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="l_name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" name="l_name" id="l_name" value={userData.l_name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-[#DCDCDC]/30 p-2.5 text-sm transition focus:border-[#C25E0A] focus:outline-none focus:ring-1 focus:ring-[#C25E0A]" placeholder="Your last name" />
            {mutation.error?.response?.data?.errors?.l_name && (
              <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.l_name} />
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-[#DCDCDC]/30 p-2.5 text-sm transition focus:border-[#C25E0A] focus:outline-none focus:ring-1 focus:ring-[#C25E0A]" placeholder="Entrer votre email" />
          {mutation.error?.response?.data?.errors?.email && (
            <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.email} />
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-[#DCDCDC]/30 p-2.5 text-sm transition focus:border-[#C25E0A] focus:outline-none focus:ring-1 focus:ring-[#C25E0A]"
            placeholder="••••••••" />
          {mutation.error?.response?.data?.errors?.password && (
            <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.password} />
          )}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={userData.password_confirmation || ''}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-[#DCDCDC]/30 p-2.5 text-sm transition focus:border-[#C25E0A] focus:outline-none focus:ring-1 focus:ring-[#C25E0A]"
            placeholder="••••••••"
          />
          {mutation.error?.response?.data?.errors?.password_confirmation && (
            <ValidationErrorMsg error={mutation.error?.response?.data?.errors?.password_confirmation} />
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#C25E0A] py-3 mt-2 font-semibold text-white shadow-md shadow-[#C25E0A]/30 transition hover:bg-[#E6C200] hover:shadow-lg active:scale-[0.98]"
        >
          Register
        </button>

        <p className="pt-2 text-center text-sm text-gray-600">
          Already have an account ?{" "}
          <button type="button" className="font-bold text-[#C25E0A] hover:underline ml-1" onClick={() => setIsFlipped(!isFlipped)}>
            Login Now
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;