import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    } else {
      const error = await response.json();
      alert(error.detail || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Try again later.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#f2f2f2] font-mono text-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-12 w-32 h-32 bg-pink-300 border-4 border-black shadow-[6px_6px_0_0_black] rotate-12" />
      <div className="absolute top-40 right-16 w-28 h-28 bg-blue-300 border-4 border-black shadow-[6px_6px_0_0_black] -rotate-6" />
      <div className="absolute bottom-20 left-20 w-36 h-36 bg-yellow-300 border-4 border-black shadow-[6px_6px_0_0_black] rotate-45" />

      {/* Header */}
      <nav className="flex justify-between items-center px-8 py-6 border-b-4 border-black bg-white relative z-10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-pink-500 w-12 h-12 flex items-center justify-center border-4 border-black shadow-[4px_4px_0_0_black]">
            <span className="text-white text-2xl">⚙</span>
          </div>
          <span className="text-3xl font-black tracking-widest border-4 border-black px-4 py-2 bg-white shadow-[4px_4px_0_0_black]">
            MINDSCAPE
          </span>
        </Link>
        <Link
          to="/"
          className="bg-green-400 px-6 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold tracking-widest text-black hover:bg-green-500 active:translate-y-1"
        >
          SIGN IN
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white border-4 border-black shadow-[8px_8px_0_0_black] p-8 w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-widest mb-4 uppercase border-4 border-black bg-pink-500 text-white px-6 py-3 shadow-[4px_4px_0_0_black] inline-block">
              CREATE ACCOUNT
            </h1>
            <p className="text-lg font-bold tracking-wide text-gray-700">
              JOIN THE MINDSCAPE REVOLUTION
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-pink-600" size={24} />
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold text-lg outline-none bg-yellow-100 focus:bg-yellow-200 tracking-wide"
                placeholder="USERNAME"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-pink-600" size={24} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold text-lg outline-none bg-blue-100 focus:bg-blue-200 tracking-wide"
                placeholder="EMAIL ADDRESS"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-pink-600" size={24} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold text-lg outline-none bg-green-100 focus:bg-green-200 tracking-wide"
                placeholder="PASSWORD"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-pink-600"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-pink-600" size={24} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold text-lg outline-none bg-pink-100 focus:bg-pink-200 tracking-wide"
                placeholder="CONFIRM PASSWORD"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-pink-600"
              >
                {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 text-white border-4 border-black shadow-[4px_4px_0_0_black] py-4 px-6 font-black text-xl tracking-widest hover:bg-pink-600 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="font-bold tracking-wide">
              ALREADY HAVE AN ACCOUNT?{" "}
              <Link to="/" className="text-pink-600 underline hover:text-pink-800">
                SIGN IN HERE
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
