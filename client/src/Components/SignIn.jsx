import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("https://mindmap-36hl.onrender.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Store user_id or token in localStorage or context
        localStorage.setItem("user_id", data.user_id);
        // Redirect ONLY on success
        navigate("/landing");
      } else {
        const error = await response.json();
        setErrorMsg(error.detail || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-mono text-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 right-20 w-28 h-28 bg-green-300 border-4 border-black shadow-[6px_6px_0_0_black] rotate-45" />
      <div className="absolute bottom-32 right-12 w-32 h-32 bg-blue-300 border-4 border-black shadow-[6px_6px_0_0_black] -rotate-12" />
      <div className="absolute top-1/2 left-16 w-24 h-24 bg-yellow-300 border-4 border-black shadow-[6px_6px_0_0_black] rotate-12" />

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
          to="/signup"
          className="bg-blue-400 px-6 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold tracking-widest text-white hover:bg-blue-500 active:translate-y-1"
        >
          SIGN UP
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
            <h1 className="text-4xl font-black tracking-widest mb-4 uppercase border-4 border-black bg-blue-500 text-white px-6 py-3 shadow-[4px_4px_0_0_black] inline-block">
              WELCOME BACK
            </h1>
            <p className="text-lg font-bold tracking-wide text-gray-700">
              UNLEASH YOUR CREATIVE POTENTIAL
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errorMsg && (
              <div className="bg-red-500 text-white p-3 border-2 border-black rounded-none font-bold">
                {errorMsg}
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold text-lg outline-none bg-blue-100 focus:bg-blue-200 tracking-wide"
                placeholder="EMAIL ADDRESS"
                aria-describedby="email-error"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-blue-600" size={24} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 border-4 border-black shadow-[4px_4px_0_0_black] font-bold text-lg outline-none bg-green-100 focus:bg-green-200 tracking-wide"
                placeholder="PASSWORD"
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-blue-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center font-bold tracking-wide cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 border-2 border-black"
                />
                REMEMBER ME
              </label>
              {/* Uncomment below for forgot password feature */}
              {/* <Link to="/forgot-password" className="text-blue-600 font-bold tracking-wide hover:text-blue-800 underline">
                FORGOT PASSWORD?
              </Link> */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white border-4 border-black shadow-[4px_4px_0_0_black] py-4 px-6 font-black text-xl tracking-widest hover:bg-blue-600 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="font-bold tracking-wide">
              DON'T HAVE AN ACCOUNT?{" "}
              <Link to="/signup" className="text-blue-600 underline hover:text-blue-800">
                CREATE ONE HERE
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
