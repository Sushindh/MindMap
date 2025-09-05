import React, { useState, useEffect } from "react";
import {
  FileBarChart,
  Plus,
  ArrowRight,
  ArrowLeft,
  LayoutDashboard,
  BrainCog,
  BookOpen,
  CalendarCheck,
  Trash2,
  Eye
} from "lucide-react";
import { Link } from 'react-router-dom';

const initialMaps = [
  {
    id: 1,
    title: "STARTUP LAUNCH PLAN",
    nodes: 20,
    date: "AUG 27, 2025",
    excerpt: ["FUNDING", "MVP", "GO-TO-MARKET", "USER FEEDBACK"],
    color: "bg-pink-500",
    createdAt: new Date('2025-08-27').getTime()
  },
  {
    id: 2,
    title: "NOVEL PLOT WEB",
    nodes: 17,
    date: "AUG 25, 2025",
    excerpt: ["ANTAGONIST", "ACT 1", "PLOT TWIST", "RESOLUTION"],
    color: "bg-green-400",
    createdAt: new Date('2025-08-25').getTime()
  },
  {
    id: 3,
    title: "MARKETING CAMPAIGN",
    nodes: 23,
    date: "AUG 22, 2025",
    excerpt: ["CHANNELS", "PERSONA", "MESSAGING", "KPIS"],
    color: "bg-blue-500",
    createdAt: new Date('2025-08-22').getTime()
  }
];

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [mindMapName, setMindMapName] = useState("");
  const [creating, setCreating] = useState(false);
  const [recentMaps, setRecentMaps] = useState(initialMaps);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const savedMaps = recentMaps;
    setRecentMaps(savedMaps);
  }, []);

  const stats = [
    { label: "TOTAL MAPS", value: recentMaps.length, icon: <LayoutDashboard className="h-6 w-6 sm:h-8 sm:w-8" />, color: "bg-pink-500" },
    { label: "IDEAS EXPLORED", value: recentMaps.reduce((sum, map) => sum + map.nodes, 0), icon: <BrainCog className="h-6 w-6 sm:h-8 sm:w-8" />, color: "bg-green-400" },
    { label: "ACTIVE SESSIONS", value: 3, icon: <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />, color: "bg-blue-500" },
    { label: "LAST SAVED", value: recentMaps.length > 0 ? getTimeDiff(Math.max(...recentMaps.map(m => m.createdAt))) : "NEVER", icon: <CalendarCheck className="h-6 w-6 sm:h-8 sm:w-8" />, color: "bg-yellow-400" },
  ];

  function getTimeDiff(timestamp) {
    const now = new Date().getTime();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} DAY${days > 1 ? 'S' : ''} AGO`;
    if (hours > 0) return `${hours} HOUR${hours > 1 ? 'S' : ''} AGO`;
    return "JUST NOW";
  }

  const getRandomColor = () => {
    const colors = ["bg-pink-500", "bg-green-400", "bg-blue-500", "bg-yellow-400", "bg-purple-400", "bg-orange-400"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomExcerpt = (topic) => {
    const baseWords = topic.split(' ');
    const additionalWords = ["ANALYSIS", "RESEARCH", "STRATEGY", "IMPLEMENTATION", "REVIEW", "PLANNING", "DEVELOPMENT", "INNOVATION"];
    return [...baseWords.slice(0, 2), ...additionalWords.slice(0, 2)];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).toUpperCase();
  };

  const handleSubmit = () => {
    if (!topic.trim() || !mindMapName.trim()) return;
    setCreating(true);
    
    setTimeout(() => {
      const newMap = {
        id: Date.now(),
        title: mindMapName.toUpperCase(),
        nodes: Math.floor(Math.random() * 30) + 10,
        date: formatDate(new Date()),
        excerpt: getRandomExcerpt(topic.toUpperCase()),
        color: getRandomColor(),
        createdAt: new Date().getTime()
      };

      setRecentMaps(prev => [newMap, ...prev]);
      
      setCreating(false);
      setTopic("");
      setMindMapName("");
      alert(`Mind map "${newMap.title}" created successfully!`);
    }, 2000);
  };

  const handleDeleteMap = (mapId) => {
    setRecentMaps(prev => prev.filter(map => map.id !== mapId));
    setShowDeleteConfirm(null);
  };

  const confirmDelete = (mapId) => {
    setShowDeleteConfirm(mapId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 font-mono">
      {/* Header */}
      <div className="border-4 border-black bg-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button 
              onClick={() => window.location.href = '/landing'}
              className="border-4 border-black bg-yellow-400 p-2 sm:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            >
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </button>
            
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight mb-1 sm:mb-2">
                MINDSCAPE
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-bold text-black uppercase">
                UNLEASH YOUR IDEAS, INNOVATOR!
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
            <input
              className="border-4 border-black bg-white px-3 sm:px-4 py-2 sm:py-3 text-black font-bold placeholder-gray-500 uppercase text-xs sm:text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow flex-1"
              type="text"
              placeholder="MAP NAME"
              value={mindMapName}
              disabled={creating}
              onChange={(e) => setMindMapName(e.target.value)}
            />
            <input
              className="border-4 border-black bg-white px-3 sm:px-4 py-2 sm:py-3 text-black font-bold placeholder-gray-500 uppercase text-xs sm:text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow flex-1"
              type="text"
              placeholder="TOPIC (E.G. AI)"
              value={topic}
              disabled={creating}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={creating || !topic.trim() || !mindMapName.trim()}
              className="border-4 border-black bg-pink-500 px-4 sm:px-6 py-2 sm:py-3 text-black font-black uppercase text-xs sm:text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:bg-yellow-300 flex items-center gap-2 flex-none"
            >
              <Link to='/mindmap/new'>
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                {creating ? "CREATING..." : "CREATE"}
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`border-4 border-black ${stat.color} p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow`}
          >
            <div className="text-black mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-black text-black mb-1">{stat.value}</div>
            <div className="text-xs sm:text-sm font-bold text-black uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Maps Section */}
      <div className="border-4 border-black bg-yellow-200 p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-black uppercase flex items-center gap-2 sm:gap-3">
            <FileBarChart className="h-5 w-5 sm:h-6 sm:w-6" />
            RECENT MIND MAPS ({recentMaps.length})
          </h2>
          
          {recentMaps.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all mind maps?")) {
                  setRecentMaps([]);
                }
              }}
              className="border-4 border-black bg-red-400 px-3 sm:px-4 py-1 sm:py-2 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center gap-2 mt-3 sm:mt-0"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              CLEAR ALL
            </button>
          )}
        </div>
        
        {recentMaps.length === 0 ? (
          <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <BrainCog className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="font-black text-black uppercase text-lg sm:text-xl mb-2">NO MIND MAPS YET</h3>
            <p className="font-bold text-gray-600 uppercase text-xs sm:text-sm">
              CREATE YOUR FIRST MIND MAP TO GET STARTED!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentMaps.map((map, i) => (
              <div
                key={map.id}
                className={`border-4 border-black ${map.color} p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-pointer relative`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(map.id);
                  }}
                  className="absolute top-2 right-2 border-2 border-black bg-red-400 p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                >
                  <Trash2 className="h-3 w-3 sm:h-3 sm:w-3 text-black" />
                </button>

                <div className="flex items-start justify-between mb-2 sm:mb-3 pr-6 sm:pr-8">
                  <h3 className="font-black text-black text-base sm:text-lg uppercase leading-tight">
                    {map.title.length > 18 ? map.title.substring(0, 18) + '...' : map.title}
                  </h3>
                  <span className="border-2 border-black bg-white px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-bold text-black">
                    {map.nodes} NODES
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {map.excerpt.map((item, j) => (
                    <span 
                      key={j} 
                      className="border-2 border-black bg-white px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-bold text-black"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button 
                      onClick={() => window.location.href = '/mindmap/new'}
                      className="flex items-center gap-1 sm:gap-2"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                      <span className="font-bold text-black text-xs sm:text-sm uppercase">VIEW</span>
                    </button>
                  </div>
                  <span className="font-bold text-black text-xs">{map.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="border-4 border-black bg-white p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-sm sm:max-w-md w-full">
            <h3 className="font-black text-black uppercase text-lg sm:text-xl mb-3 sm:mb-4">CONFIRM DELETE</h3>
            <p className="font-bold text-black text-sm sm:text-base mb-4 sm:mb-6">
              ARE YOU SURE YOU WANT TO DELETE THIS MIND MAP? THIS ACTION CANNOT BE UNDONE.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 border-4 border-black bg-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleDeleteMap(showDeleteConfirm)}
                className="flex-1 border-4 border-black bg-red-400 px-3 sm:px-4 py-2 sm:py-3 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How it Works Section */}
      <div className="mt-6 sm:mt-8 border-4 border-black bg-green-400 p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl sm:text-2xl font-black text-black uppercase mb-4 sm:mb-6">HOW IT WORKS:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { num: "1", text: "ENTER YOUR TOPIC" },
            { num: "2", text: "HIT CREATE" },
            { num: "3", text: "WATCH THE MAGIC" },
            { num: "4", text: "MANAGE HISTORY" }
          ].map((step, i) => (
            <div key={i} className="border-4 border-black bg-white p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black bg-pink-500 rounded-full flex items-center justify-center font-black text-black mb-2">
                {step.num}
              </div>
              <p className="font-bold text-black text-xs sm:text-sm uppercase">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t-4 border-black py-6 sm:py-8 px-4 sm:px-8 mt-6 sm:mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="border-4 border-black bg-yellow-400 p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-center font-black text-black uppercase text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} MINDSCAPE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}