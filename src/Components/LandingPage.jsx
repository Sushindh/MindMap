import React from "react";
import { 
  BrainCog, 
  Wand2, 
  Expand, 
  FileDown, 
  Zap, 
  Move3D, 
  UserPlus, 
  PlayCircle 
} from "lucide-react";
import Dashboard from "./Dashboard";
import {Link}from "react-router-dom"

const features = [
  {
    title: "AI-POWERED IDEA WEBS",
    icon: <BrainCog className="h-10 w-10 text-black" />,
    desc: "ENTER ANY TOPIC AND INSTANTLY GENERATE A MIND-MAP WITH SMART, INTERCONNECTED IDEAS.",
    color: "bg-pink-500"
  },
  {
    title: "ANIMATED MIND MAPPING",
    icon: <Move3D className="h-10 w-10 text-black" />,
    desc: "EXPLORE, DRAG, AND ZOOM THROUGH YOUR CREATIVE NETWORK WITH SMOOTH RADIAL ANIMATIONS.",
    color: "bg-green-400"
  },
  {
    title: "DYNAMIC NODE EXPANSION",
    icon: <Expand className="h-10 w-10 text-black" />,
    desc: "EXPAND IDEAS ENDLESSLY. CLICK NODES TO PROMPT THE AI FOR DEEPER OR RELATED THOUGHTS.",
    color: "bg-blue-500"
  },
  {
    title: "EXPORT & SHARE",
    icon: <FileDown className="h-10 w-10 text-black" />,
    desc: "EXPORT YOUR MIND MAP AS PDF OR IMAGE, OR SHARE WITH A SIMPLE LINK.",
    color: "bg-yellow-400"
  },
  {
    title: "NON-TEMPLATE, CREATIVE UX",
    icon: <Wand2 className="h-10 w-10 text-black" />,
    desc: "BREAK OUT OF BORING TEMPLATES—MINDSCAPE ENCOURAGES YOUR UNIQUE BRAINSTORM STYLE.",
    color: "bg-pink-500"
  },
  {
    title: "SUPERFAST & SECURE",
    icon: <Zap className="h-10 w-10 text-black" />,
    desc: "LIGHTNING-FAST AI AND SECURE ACCOUNTS KEEP YOU FOCUSED ON CREATIVITY.",
    color: "bg-green-400"
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-mono">
      {/* Navbar */}
      <header className="border-b-4 border-black bg-gray-200 px-8 py-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-4 border-black bg-pink-500 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <BrainCog className="h-8 w-8 text-black" />
            </div>
            <span className="font-black text-3xl tracking-tight text-black uppercase">MINDSCAPE</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="font-bold text-black uppercase hover:bg-yellow-400 px-3 py-1 transition border-2 border-transparent hover:border-black">
              FEATURES
            </a>
            <a href="#demo" className="font-bold text-black uppercase hover:bg-yellow-400 px-3 py-1 transition border-2 border-transparent hover:border-black">
              DEMO
            </a>
            <button className="border-4 border-black bg-green-400 px-6 py-2 text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              SIGN UP
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-16 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="flex-1">
            <div className="border-4 border-black bg-yellow-200 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black uppercase mb-6 leading-tight">
                VISUAL AI<br />
                BRAINSTORMING<br />
                <span className="bg-pink-500 px-2 py-1 border-2 border-black">TOOL</span>
              </h1>
              <p className="text-lg md:text-xl font-bold text-black uppercase mb-6">
                FOR MIND MAPPERS & INNOVATORS
              </p>
            </div>
            
            <div className="border-4 border-black bg-blue-400 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
              <p className="text-lg font-bold text-black uppercase leading-relaxed">
                TRANSFORM A SINGLE TOPIC INTO A DYNAMIC, ANIMATED WEB OF IDEAS POWERED BY GEMINI AI.
                MINDSCAPE UNLOCKS CREATIVITY FOR PROJECTS, ESSAYS, WRITING, BUSINESS, AND MORE!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="border-4 border-black bg-pink-500 px-8 py-4 text-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center justify-center gap-3">
                <Wand2 className="h-6 w-6" />
                <Link to='/dashboard' >TRY IT NOW</Link>
              </button>
              <button className="border-4 border-black bg-green-400 px-8 py-4 text-black font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center justify-center gap-3">
                <PlayCircle className="h-6 w-6" />
                WATCH DEMO
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 flex justify-center">
            <div className="border-4 border-black bg-gray-100 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
              {/* Central AI Node */}
              <div className="border-4 border-black bg-blue-500 w-24 h-24 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 mx-auto">
                <BrainCog className="h-12 w-12 text-black" />
              </div>
              
              {/* Surrounding Idea Nodes */}
              <div className="grid grid-cols-3 gap-4">
                {["PROJECT", "ESSAY", "STARTUP", "PLOT", "DESIGN", "CAMPAIGN", "STRATEGY", "RESEARCH", "CREATIVE"].map((item, i) => (
                  <div
                    key={i}
                    className={`border-2 border-black p-3 text-center font-black text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      i % 4 === 0 ? 'bg-pink-500' : 
                      i % 4 === 1 ? 'bg-green-400' : 
                      i % 4 === 2 ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t-4 border-black bg-gray-200 px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="border-4 border-black bg-yellow-400 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-black text-center uppercase">
              UNLOCK YOUR MIND WITH ALL-IN-ONE FEATURES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`border-4 border-black ${feature.color} p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-black text-black uppercase mb-4 leading-tight">{feature.title}</h3>
                <p className="text-sm font-bold text-black uppercase leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="border-t-4 border-black bg-white px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="border-4 border-black bg-pink-500 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase mb-4">
              SEE MINDSCAPE IN ACTION
            </h2>
            <p className="text-lg font-bold text-black uppercase">
              EXPERIENCE LIVE BRAINSTORMING WITH GEMINI AI AND DISCOVER HOW YOUR IDEAS EVOLVE!
            </p>
          </div>
          
          {/* Demo Placeholder */}
          {/* <div className="border-4 border-black bg-gray-100 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-4 border-black bg-blue-400 h-64 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-center">
                <PlayCircle className="h-16 w-16 text-black mx-auto mb-4" />
                <p className="font-black text-xl text-black uppercase">DEMO VIDEO HERE</p>
                <p className="font-bold text-black uppercase text-sm mt-2">CLICK TO WATCH MINDSCAPE IN ACTION</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-gray-200 py-8 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="border-4 border-black bg-yellow-400 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-center font-black text-black uppercase">
              &copy; {new Date().getFullYear()} MINDSCAPE. ALL RIGHTS RESERVED. POWERED BY CHAOS MODE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}