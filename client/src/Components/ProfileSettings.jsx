
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings2,
  Slash,
  Download,
  Moon,
  SunMedium,
  Save,
  LogOut
} from "lucide-react";

export default function ProfileSettings() {
  // Initial mock state for user profile and settings
  const [profile, setProfile] = useState({
    username: "innovator123",
    email: "innovator@example.com"
  });

  const [aiPrefs, setAiPrefs] = useState({
    creativity: 0.8, // 0 to 1
    responseLength: 150, // tokens approx
  });

  const [exportPrefs, setExportPrefs] = useState({
    format: "pdf", // 'pdf' or 'image'
  });

  const [theme, setTheme] = useState("light"); // 'light' or 'dark'
  const [saving, setSaving] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  // Save handler simulates async save
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved!");
    }, 1200);
  };

  // Theme toggle
  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    // In real app, update CSS root or apply tailwind dark class
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-white rounded-lg shadow-lg my-6 sm:my-8">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <User className="h-5 w-5 sm:h-6 sm:w-6" /> Profile & Settings
      </h1>

      {/* Profile Section */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-blue-600">
          <Settings2 className="h-4 w-4 sm:h-5 sm:w-5" /> User Profile
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4 sm:space-y-5"
        >
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={profile.username}
              onChange={(e) =>
                setProfile((p) => ({ ...p, username: e.target.value }))
              }
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
              aria-label="Username"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
              aria-label="Email"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter new password"
                aria-label="New password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((v) => !v)}
                className="absolute right-2 sm:right-3 top-1.5 sm:top-2 text-gray-400 hover:text-gray-700"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <Slash className="h-4 w-4 sm:h-5 sm:w-5" /> : <User className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <motion.button
            type="submit"
            disabled={saving}
            whileTap={{ scale: 0.95 }}
            className={`w-full sm:w-auto px-6 py-2 sm:px-8 sm:py-2.5 rounded-md font-semibold text-white text-sm sm:text-base ${
              saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition disabled:cursor-not-allowed`}
            aria-label="Save profile settings"
          >
            <Save className="inline mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 -mt-0.5" />
            {saving ? "Saving..." : "Save Profile"}
          </motion.button>
        </form>
      </section>

      {/* AI Preferences */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-blue-600">
          <BotMessageSquare className="h-4 w-4 sm:h-5 sm:w-5" /> AI Preferences
        </h2>
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="creativity" className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Creativity Level ({Math.round(aiPrefs.creativity * 100)}%)
            </label>
            <input
              type="range"
              id="creativity"
              min="0"
              max="1"
              step="0.05"
              value={aiPrefs.creativity}
              onChange={(e) =>
                setAiPrefs((p) => ({ ...p, creativity: Number(e.target.value) }))
              }
              className="w-full"
              aria-label="AI creativity level"
            />
          </div>
          <div>
            <label htmlFor="responseLength" className="block mb-1 font-semibold text-gray-700 text-sm sm:text-base">
              Response Length (max tokens: {aiPrefs.responseLength})
            </label>
            <input
              type="number"
              id="responseLength"
              min="50"
              max="500"
              step="10"
              value={aiPrefs.responseLength}
              onChange={(e) =>
                setAiPrefs((p) => ({ ...p, responseLength: Number(e.target.value) }))
              }
              className="w-24 sm:w-28 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              aria-label="AI response length"
            />
          </div>
        </div>
      </section>

      {/* Export Settings */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-blue-600">
          <Download className="h-4 w-4 sm:h-5 sm:w-5" /> Export Settings
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <label className="inline-flex items-center gap-2 text-gray-700 font-medium cursor-pointer text-sm sm:text-base">
            <input
              type="radio"
              name="exportFormat"
              value="pdf"
              checked={exportPrefs.format === "pdf"}
              onChange={() => setExportPrefs({ format: "pdf" })}
              className="form-radio h-4 w-4 sm:h-5 sm:w-5"
              aria-label="Export as PDF"
            />
            PDF
          </label>
          <label className="inline-flex items-center gap-2 text-gray-700 font-medium cursor-pointer text-sm sm:text-base">
            <input
              type="radio"
              name="exportFormat"
              value="image"
              checked={exportPrefs.format === "image"}
              onChange={() => setExportPrefs({ format: "image" })}
              className="form-radio h-4 w-4 sm:h-5 sm:w-5"
              aria-label="Export as Image"
            />
            Image
          </label>
        </div>
      </section>

      {/* Theme Toggle */}
      <section className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <span className="font-semibold text-blue-600 text-sm sm:text-base">Theme:</span>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-sm sm:text-base"
        >
          {theme === "light" ? <SunMedium className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      </section>

      {/* Logout */}
      <div className="mt-6 sm:mt-8">
        <button
          onClick={() => alert("Logging out...")}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-base transition"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
