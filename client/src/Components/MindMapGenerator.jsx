import React, { useState, useEffect, useRef } from "react";
import { BrainCog, Zap, AlertCircle, ArrowLeft, Download, Share2, Plus, Info, Lightbulb, X, MessageCircle, Send, Trash2, Settings, Menu } from "lucide-react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const initialMindMapData = {
  "MINDSCAPE": {
    id: "root",
    x: 400,
    y: 300,
    color: "bg-pink-500",
    children: ["CREATE TOPIC", "TO START", "GENERATING"]
  },
  "CREATE TOPIC": {
    id: "create",
    x: 200,
    y: 200,
    color: "bg-green-400",
    parent: "MINDSCAPE"
  },
  "TO START": {
    id: "start",
    x: 600,
    y: 200,
    color: "bg-blue-500",
    parent: "MINDSCAPE"
  },
  "GENERATING": {
    id: "gen",
    x: 400,
    y: 500,
    color: "bg-yellow-400",
    parent: "MINDSCAPE"
  }
};

export default function MindMapGenerator() {
  const [topic, setTopic] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [mindMapName, setMindMapName] = useState("MINDSCAPE - MIND MAP");
  const [nodes, setNodes] = useState(initialMindMapData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // New state for sidebar toggle
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandingNode, setExpandingNode] = useState(null);
  const canvasRef = useRef(null);

  const getRandomColor = () => {
    const colors = [
      "bg-pink-500", "bg-green-400", "bg-blue-500", "bg-yellow-400", 
      "bg-purple-400", "bg-orange-400", "bg-red-400", "bg-cyan-400",
      "bg-indigo-400", "bg-lime-400", "bg-rose-400", "bg-emerald-400"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const callGeminiAPI = async (prompt) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      throw new Error("GEMINI API KEY NOT SET IN CODE");
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API ERROR: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error(`GEMINI API ERROR: ${error.message}`);
    }
  };

  const generateMindMap = async (topicInput) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      setError("PLEASE SET YOUR GEMINI API KEY IN THE CODE");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const prompt = `Create a mind map structure for the topic "${topicInput}". 
      Please provide 4-6 main concepts related to this topic, and for each main concept, provide 2-4 sub-concepts.
      Format your response as JSON with this structure:
      {
        "mainConcepts": ["concept1", "concept2", "concept3", "concept4"],
        "subConcepts": {
          "concept1": ["sub1", "sub2", "sub3"],
          "concept2": ["sub1", "sub2", "sub3"],
          ...
        }
      }
      Keep concept names short (2-4 words max) and use uppercase. Make sure concepts are relevant and educational.`;

      const response = await callGeminiAPI(prompt);
      
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("INVALID API RESPONSE FORMAT");
      }

      const mindMapData = JSON.parse(jsonMatch[0]);
      const topicKey = topicInput.toUpperCase();
      
      let newNodes = {};
      
      newNodes[topicKey] = {
        id: "root",
        x: window.innerWidth < 640 ? window.innerWidth / 2 - 75 : 400,
        y: window.innerHeight < 640 ? window.innerHeight / 2 - 37.5 : 300,
        color: "bg-pink-500",
        children: mindMapData.mainConcepts.map(c => c.toUpperCase())
      };
      
      mindMapData.mainConcepts.forEach((concept, index) => {
        const upperConcept = concept.toUpperCase();
        const angle = (index * 2 * Math.PI) / mindMapData.mainConcepts.length;
        const radius = window.innerWidth < 640 ? 100 : 200;
        const x = newNodes[topicKey].x + Math.cos(angle) * radius;
        const y = newNodes[topicKey].y + Math.sin(angle) * radius;
        
        newNodes[upperConcept] = {
          id: `main_${index}`,
          x: Math.max(50, Math.min(x, window.innerWidth - 150)),
          y: Math.max(50, Math.min(y, window.innerHeight - 75)),
          color: getRandomColor(),
          parent: topicKey,
          children: mindMapData.subConcepts[concept] ? mindMapData.subConcepts[concept].map(s => s.toUpperCase()) : []
        };
        
        if (mindMapData.subConcepts[concept]) {
          mindMapData.subConcepts[concept].forEach((subConcept, subIndex) => {
            const upperSubConcept = subConcept.toUpperCase();
            const subAngle = angle + (subIndex - mindMapData.subConcepts[concept].length/2 + 0.5) * 0.4;
            const subRadius = window.innerWidth < 640 ? 60 : 120;
            const subX = newNodes[upperConcept].x + Math.cos(subAngle) * subRadius;
            const subY = newNodes[upperConcept].y + Math.sin(subAngle) * subRadius;
            
            newNodes[upperSubConcept] = {
              id: `sub_${index}_${subIndex}`,
              x: Math.max(25, Math.min(subX, window.innerWidth - 125)),
              y: Math.max(25, Math.min(subY, window.innerHeight - 50)),
              color: "bg-gray-300",
              parent: upperConcept
            };
          });
        }
      });

      setNodes(newNodes);
      setMindMapName(`${topicKey} - MIND MAP`);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!topic.trim()) return;
    generateMindMap(topic.trim());
  };

  const sendMessage = async () => {
    if (!userMessage.trim() || !selectedNode || !GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") return;

    const newMessage = { type: 'user', content: userMessage };
    setChatMessages(prev => [...prev, newMessage]);
    setUserMessage("");
    setIsGenerating(true);

    try {
      const prompt = `You are an AI assistant helping with a mind map about "${selectedNode}". 
      The user asks: "${userMessage}"
      
      Please provide a helpful, informative response about this topic. Keep it concise but informative (2-3 sentences max).
      If the user is asking to expand or add more information, suggest specific related concepts that could be added to the mind map.`;

      const response = await callGeminiAPI(prompt);
      
      setChatMessages(prev => [...prev, { type: 'ai', content: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { type: 'ai', content: `Error: ${error.message}` }]);
    }

    setIsGenerating(false);
  };

  const expandNodeWithAI = async (nodeKey) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      setError("PLEASE SET YOUR GEMINI API KEY IN THE CODE");
      return;
    }

    setExpandingNode(nodeKey);
    
    try {
      const prompt = `For the concept "${nodeKey}", suggest 3-4 specific related sub-concepts or aspects that would be good additions to a mind map. 
      Respond with only a JSON array of strings, like: ["CONCEPT1", "CONCEPT2", "CONCEPT3"]
      Keep each concept short (2-3 words max) and use uppercase. Make them specific and relevant to "${nodeKey}".`;

      const response = await callGeminiAPI(prompt);
      
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("INVALID EXPANSION RESPONSE");
      }

      const newConcepts = JSON.parse(jsonMatch[0]);
      const parentNode = nodes[nodeKey];
      
      const newNodes = { ...nodes };
      const baseAngle = Math.random() * 2 * Math.PI;
      
      newConcepts.forEach((concept, index) => {
        const conceptKey = concept.toUpperCase();
        if (newNodes[conceptKey]) return;
        
        const angle = baseAngle + (index * 2 * Math.PI) / newConcepts.length;
        const radius = window.innerWidth < 640 ? 60 : 120;
        const x = parentNode.x + Math.cos(angle) * radius;
        const y = parentNode.y + Math.sin(angle) * radius;
        
        newNodes[conceptKey] = {
          id: `exp_${Date.now()}_${index}`,
          x: Math.max(25, Math.min(x, window.innerWidth - 125)),
          y: Math.max(25, Math.min(y, window.innerHeight - 50)),
          color: getRandomColor(),
          parent: nodeKey
        };
        
        newNodes[nodeKey] = {
          ...parentNode,
          children: [...(parentNode.children || []), conceptKey]
        };
      });

      setNodes(newNodes);
    } catch (error) {
      setError(`EXPANSION ERROR: ${error.message}`);
    }

    setExpandingNode(null);
  };

  const deleteNode = (nodeKey) => {
    if (nodeKey === Object.keys(nodes)[0]) return;
    
    const newNodes = { ...nodes };
    const nodeToDelete = newNodes[nodeKey];
    
    if (nodeToDelete.parent && newNodes[nodeToDelete.parent]) {
      const parent = newNodes[nodeToDelete.parent];
      newNodes[nodeToDelete.parent] = {
        ...parent,
        children: (parent.children || []).filter(child => child !== nodeKey)
      };
    }
    
    const deleteChildren = (parentKey) => {
      const parent = newNodes[parentKey];
      if (parent && parent.children) {
        parent.children.forEach(child => {
          deleteChildren(child);
          delete newNodes[child];
        });
      }
    };
    
    deleteChildren(nodeKey);
    delete newNodes[nodeKey];
    
    setNodes(newNodes);
    if (selectedNode === nodeKey) {
      setSelectedNode(null);
      setShowAiPanel(false);
    }
  };

  const downloadMindMap = async () => {
    if (!canvasRef.current) return;

    try {
      const mindMapElement = canvasRef.current;
      const rect = mindMapElement.getBoundingClientRect();
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
      
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      Object.entries(nodes).forEach(([nodeKey, node]) => {
        if (node.parent && nodes[node.parent]) {
          const parent = nodes[node.parent];
          ctx.beginPath();
          ctx.moveTo(parent.x + (nodeKey === Object.keys(nodes)[0] ? 96 : 72), parent.y + (nodeKey === Object.keys(nodes)[0] ? 40 : 32));
          ctx.lineTo(node.x + (nodeKey === Object.keys(nodes)[0] ? 96 : 72), node.y + (nodeKey === Object.keys(nodes)[0] ? 40 : 32));
          ctx.stroke();
        }
      });
      
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      Object.entries(nodes).forEach(([nodeKey, node]) => {
        const colorMap = {
          'bg-pink-500': '#ec4899',
          'bg-green-400': '#4ade80',
          'bg-blue-500': '#3b82f6',
          'bg-yellow-400': '#facc15',
          'bg-purple-400': '#c084fc',
          'bg-orange-400': '#fb923c',
          'bg-red-400': '#f87171',
          'bg-cyan-400': '#22d3ee',
          'bg-indigo-400': '#818cf8',
          'bg-lime-400': '#a3e635',
          'bg-rose-400': '#fb7185',
          'bg-emerald-400': '#34d399',
          'bg-gray-300': '#d1d5db'
        };
        
        ctx.fillStyle = colorMap[node.color] || '#d1d5db';
        const width = nodeKey === Object.keys(nodes)[0] ? (window.innerWidth < 640 ? 128 : 192) : (window.innerWidth < 640 ? 96 : 144);
        const height = nodeKey === Object.keys(nodes)[0] ? (window.innerWidth < 640 ? 64 : 80) : (window.innerWidth < 640 ? 48 : 64);
        ctx.fillRect(node.x, node.y, width, height);
        
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.strokeRect(node.x, node.y, width, height);
        
        ctx.fillStyle = 'black';
        const text = nodeKey.length > 20 ? nodeKey.substring(0, 20) + '...' : nodeKey;
        ctx.fillText(text, node.x + width/2, node.y + height/2);
      });

      const link = document.createElement('a');
      link.download = `${mindMapName.replace(/\s+/g, '_').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      setError("DOWNLOAD FAILED: " + error.message);
    }
  };

  const handleMouseDown = (e, nodeKey) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const node = nodes[nodeKey];
    setDraggedNode(nodeKey);
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedNode) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setNodes(prev => ({
      ...prev,
      [draggedNode]: {
        ...prev[draggedNode],
        x: Math.max(25, Math.min(newX, rect.width - (prev[draggedNode].id === 'root' ? 150 : 100))),
        y: Math.max(25, Math.min(newY, rect.height - (prev[draggedNode].id === 'root' ? 75 : 50)))
      }
    }));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleNodeClick = (nodeKey) => {
    if (draggedNode) return;
    
    setSelectedNode(nodeKey);
    setShowAiPanel(true);
    setChatMessages([]);
    setAiResponse("");
  };

  const drawConnections = () => {
    const connections = [];
    
    Object.entries(nodes).forEach(([nodeKey, node]) => {
      if (node.parent && nodes[node.parent]) {
        const parent = nodes[node.parent];
        const isRoot = nodeKey === Object.keys(nodes)[0];
        connections.push(
          <line
            key={`${node.parent}-${nodeKey}`}
            x1={parent.x + (isRoot ? 96 : 72)}
            y1={parent.y + (isRoot ? 40 : 32)}
            x2={node.x + (isRoot ? 96 : 72)}
            y2={node.y + (isRoot ? 40 : 32)}
            stroke="black"
            strokeWidth="4"
            className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
          />
        );
      }
    });
    
    return connections;
  };

  useEffect(() => {
    if (draggedNode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedNode, dragOffset]);

  return (
    <div className="min-h-screen bg-white font-mono">
      {/* Header */}
      <header className="border-b-4 border-black bg-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="border-4 border-black bg-yellow-400 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            >
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </button>
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="border-4 border-black bg-blue-400 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow sm:hidden"
            >
              <Menu className="h-5 w-5 text-black" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-black uppercase">{mindMapName}</h1>
              <p className="text-xs sm:text-sm font-bold text-black uppercase">GEMINI AI POWERED MIND MAP</p>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button 
              onClick={downloadMindMap}
              className="border-4 border-black bg-green-400 px-3 sm:px-4 py-1 sm:py-2 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center gap-2"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              DOWNLOAD
            </button>
            <button className="border-4 border-black bg-blue-500 px-3 sm:px-4 py-1 sm:py-2 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center gap-2">
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              SHARE
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className={`w-full sm:w-64 md:w-80 border-r-4 border-black bg-yellow-200 p-4 sm:p-6 shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] absolute sm:static top-0 left-0 z-30 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
          <div className="border-4 border-black bg-pink-500 p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 sm:mb-6">
            <h2 className="font-black text-lg sm:text-xl text-black uppercase mb-2 flex items-center gap-2">
              <BrainCog className="h-5 w-5 sm:h-6 sm:w-6" />
              AI MIND MAPPER
            </h2>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="border-4 border-black bg-white p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3 sm:mb-4">
              <label className="font-black text-black uppercase text-xs sm:text-sm mb-2 block">
                ENTER TOPIC:
              </label>
              <input
                className="w-full border-4 border-black bg-white px-2 sm:px-3 py-1 sm:py-2 text-black font-bold placeholder-gray-500 uppercase text-xs sm:text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                placeholder="E.G. MACHINE LEARNING"
                value={topic}
                onChange={(e) => setTopic(e.target.value.toUpperCase())}
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full border-4 border-black bg-green-400 px-3 sm:px-4 py-2 sm:py-3 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:bg-gray-300 flex items-center justify-center gap-2"
              disabled={loading || !GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE"}
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              {loading ? "GENERATING..." : "GENERATE WITH AI"}
            </button>
          </div>

          {error && (
            <div className="border-4 border-black bg-red-400 p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                <p className="font-bold text-black uppercase text-xs">{error}</p>
              </div>
            </div>
          )}

          {(!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") && (
            <div className="border-4 border-black bg-orange-400 p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3 sm:mb-4">
              <p className="font-bold text-black uppercase text-xs sm:text-sm mb-2">⚠ API KEY NOT SET</p>
              <p className="font-bold text-black uppercase text-xs">PLEASE SET GEMINI_API_KEY IN THE CODE</p>
            </div>
          )}

          <div className="border-4 border-black bg-blue-400 p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-black uppercase text-xs sm:text-sm mb-2 sm:mb-3">HOW TO USE:</h3>
            <ul className="space-y-2 text-xs font-bold text-black uppercase">
              <li>• API KEY IS HARDCODED</li>
              <li>• DRAG NODES TO MOVE</li>
              <li>• TAP/CLICK NODE FOR AI CHAT</li>
              <li>• LONG PRESS/RIGHT-CLICK TO AI EXPAND</li>
              <li>• SHIFT+CLICK TO DELETE</li>
            </ul>
          </div>
        </aside>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="border-4 border-black bg-yellow-400 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="animate-spin">
                    <BrainCog className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <span className="font-black text-lg sm:text-xl text-black uppercase">AI THINKING...</span>
                </div>
              </div>
            </div>
          )}

          <main 
            ref={canvasRef}
            className="w-full h-full bg-gray-100 relative overflow-auto cursor-move"
            style={{ userSelect: 'none', touchAction: 'none' }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {drawConnections()}
            </svg>

            {Object.entries(nodes).map(([nodeKey, node]) => (
              <div
                key={nodeKey}
                className={`absolute border-4 border-black ${node.color} p-2 sm:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-pointer z-20 group ${
                  nodeKey === selectedNode ? 'ring-4 ring-yellow-400' : ''
                } ${nodeKey === Object.keys(nodes)[0] ? 'w-32 sm:w-48 h-16 sm:h-20' : 'w-24 sm:w-36 h-12 sm:h-16'} ${
                  expandingNode === nodeKey ? 'animate-pulse' : ''
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                }}
                onMouseDown={(e) => handleMouseDown(e, nodeKey)}
                onTouchStart={(e) => {
                  if (e.touches.length === 1) {
                    e.preventDefault();
                    const touch = e.touches[0];
                    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: () => {} }, nodeKey);
                  }
                }}
                onClick={(e) => {
                  if (e.shiftKey && nodeKey !== Object.keys(nodes)[0]) {
                    deleteNode(nodeKey);
                  } else {
                    handleNodeClick(nodeKey);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  expandNodeWithAI(nodeKey);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  if (e.changedTouches.length === 1 && !draggedNode) {
                    handleNodeClick(nodeKey);
                  }
                  handleMouseUp();
                }}
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <h4 className={`font-black text-black uppercase text-center leading-tight ${
                    nodeKey === Object.keys(nodes)[0] ? 'text-xs sm:text-sm' : 'text-xs'
                  }`}>
                    {nodeKey.length > 20 ? nodeKey.substring(0, 20) + '...' : nodeKey}
                  </h4>
                  <div className="flex gap-1 mt-1 opacity-60 group-hover:opacity-100">
                    <MessageCircle className="h-3 w-3 text-black" />
                    <Plus className="h-3 w-3 text-black" />
                    {nodeKey !== Object.keys(nodes)[0] && (
                      <Trash2 className="h-3 w-3 text-black" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>

        {/* AI Chat Panel */}
        {showAiPanel && selectedNode && (
          <div className={`w-full sm:w-80 md:w-96 border-l-4 border-black bg-purple-200 p-4 sm:p-6 shadow-[-4px_0px_0px_0px_rgba(0,0,0,1)] flex flex-col absolute sm:static top-0 right-0 z-30 transition-transform duration-300 ${showAiPanel ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}`}>
            <div className="border-4 border-black bg-white p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3 sm:mb-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-black text-black uppercase text-xs sm:text-sm flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  AI CHAT
                </h3>
                <button 
                  onClick={() => setShowAiPanel(false)}
                  className="border-2 border-black bg-red-400 p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                </button>
              </div>
              <div className="border-4 border-black bg-yellow-400 p-2 sm:p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-black uppercase text-xs">SELECTED: {selectedNode}</p>
              </div>
            </div>

            <div className="border-4 border-black bg-white p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3 sm:mb-4 flex-1 overflow-y-auto max-h-48 sm:max-h-64">
              {chatMessages.length === 0 ? (
                <p className="text-xs sm:text-sm font-bold text-gray-600 text-center">ASK ME ANYTHING ABOUT {selectedNode}!</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-2 sm:p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                        msg.type === 'user' 
                          ? 'bg-blue-300 ml-2 sm:ml-4' 
                          : 'bg-green-300 mr-2 sm:mr-4'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-xs uppercase">
                          {msg.type === 'user' ? 'YOU' : 'GEMINI AI'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-black">{msg.content}</p>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="bg-green-300 mr-2 sm:mr-4 p-2 sm:p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2">
                        <BrainCog className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        <span className="font-black text-xs uppercase">GEMINI AI THINKING...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-4 border-black bg-white p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3 sm:mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border-2 border-black bg-yellow-100 px-2 sm:px-3 py-1 sm:py-2 text-black font-bold text-xs sm:text-sm focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="ASK ABOUT THIS NODE..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={isGenerating}
                />
                <button
                  onClick={sendMessage}
                  disabled={!userMessage.trim() || isGenerating}
                  className="border-2 border-black bg-green-400 p-1 sm:p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow disabled:bg-gray-300"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => expandNodeWithAI(selectedNode)}
                disabled={expandingNode === selectedNode}
                className="w-full border-4 border-black bg-green-400 px-3 sm:px-4 py-2 sm:py-3 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center justify-center gap-2 disabled:bg-gray-300"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                {expandingNode === selectedNode ? "EXPANDING..." : "AI EXPAND NODE"}
              </button>
              
              {selectedNode !== Object.keys(nodes)[0] && (
                <button 
                  onClick={() => deleteNode(selectedNode)}
                  className="w-full border-4 border-black bg-red-400 px-3 sm:px-4 py-2 sm:py-2 text-black font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  DELETE NODE
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}