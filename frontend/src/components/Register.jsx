import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { registerUser, signUpWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch address fields and other fields for different validation
  const watchedAddressFields = watch(["country", "street", "state", "city", "zipcode"]);
  const watchedOtherFields = watch(["fullName", "phone"]);
  
  // For Google sign-in: all fields except email and password must be filled
  const googleSignInFieldsFilled = [...watchedAddressFields, ...watchedOtherFields].every(field => field && field.trim() !== "");
  
  // For regular account creation: all fields must be filled (handled by form validation)

  const onSubmit = async (data) => {
    const {
      email,
      password,
      fullName,
      phone,
      country,
      street,
      state,
      city,
      zipcode,
    } = data;

    const address = {
      country,
      street,
      state,
      city,
      zipcode,
    };

    try {
      await registerUser(email, password, fullName, phone, address);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Please check your inputs.");
    }
  };

  const handleGoogleSignIn = async () => {
    if (!googleSignInFieldsFilled) {
      return;
    }

    try {
      const fullName = watch("fullName");
      const phone = watch("phone");
      const address = {
        country: watch("country"),
        street: watch("street"),
        state: watch("state"),
        city: watch("city"),
        zipcode: watch("zipcode")
      };

      await signUpWithGoogle(fullName, phone, address);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      alert("Google sign-in failed!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl px-8 py-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join our book community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
              Personal Information
            </h3>
            
            <div className="relative">
              <input
                {...register("fullName", { 
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                placeholder="Full Name"
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Email Address"
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[\d\s\-\(\)]+$/,
                    message: "Invalid phone number format"
                  }
                })}
                placeholder="Phone Number"
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
              Address Information
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  {...register("country", { required: "Country is required" })}
                  placeholder="Country"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.country ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("state", { required: "State is required" })}
                  placeholder="State"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.state ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                {...register("street", { required: "Street address is required" })}
                placeholder="Street Address"
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.street ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  {...register("city", { required: "City is required" })}
                  placeholder="City"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.city ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("zipcode", { required: "Zip code is required" })}
                  placeholder="Zip Code"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.zipcode ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.zipcode && (
                  <p className="mt-1 text-sm text-red-600">{errors.zipcode.message}</p>
                )}
              </div>
            </div>
          </div>

          {message && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700 text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign-in */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={!googleSignInFieldsFilled}
            className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 shadow-lg ${
              googleSignInFieldsFilled
                ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-105 focus:ring-red-300'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
            }`}
          >
            <FaGoogle className="mr-3" />
            {googleSignInFieldsFilled ? 'Continue with Google' : 'Fill required fields to enable Google sign-in'}
          </button>

          {!googleSignInFieldsFilled && (
            <p className="text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
              ⚠️ Please complete all fields except email and password to enable Google sign-in
            </p>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-400 text-xs">
            ©2025 Book Store. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;