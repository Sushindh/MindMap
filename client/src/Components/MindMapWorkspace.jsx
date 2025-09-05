import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow";
import { motion } from "framer-motion";
import {
  Plus,
  Download,
  Undo2,
  Redo2,
  BotMessageSquare,
  XCircle,
  Menu
} from "lucide-react";
import "reactflow/dist/style.css";

export default function MindMapWorkspace() {
  const location = useLocation();
  const { state } = location;

  const [nodes, setNodes, onNodesChange] = useNodesState(state?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(state?.edges || []);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleExpandNode = useCallback(
    async (node) => {
      setIsExpanding(true);
      setError("");
      try {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const offsetX = canvasWidth < 640 ? 80 : 120;
        const offsetY = canvasWidth < 640 ? 40 : 60;

        const newId1 = `${node.id}-a-${Math.random().toString(16).slice(2, 5)}`;
        const newId2 = `${node.id}-b-${Math.random().toString(16).slice(2, 5)}`;
        setNodes((nds) => [
          ...nds,
          {
            id: newId1,
            data: { label: `Idea for ${node.data.label}` },
            position: {
              x: Math.max(25, Math.min(node.position.x + offsetX, canvasWidth - 100)),
              y: Math.max(25, node.position.y + (Math.random() * offsetY - offsetY / 2))
            }
          },
          {
            id: newId2,
            data: { label: `Inspire from ${node.data.label}` },
            position: {
              x: Math.max(25, Math.min(node.position.x - offsetX, canvasWidth - 100)),
              y: Math.max(25, node.position.y + (Math.random() * offsetY - offsetY / 2))
            }
          }
        ]);
        setEdges((eds) => [
          ...eds,
          { id: `e${node.id}-${newId1}`, source: node.id, target: newId1 },
          { id: `e${node.id}-${newId2}`, source: node.id, target: newId2 }
        ]);
      } catch {
        setError("AI expansion failed. Try again.");
      } finally {
        setIsExpanding(false);
      }
    },
    [setNodes, setEdges]
  );

  const handleUndo = () => {
    alert("Undo not implemented yet");
  };

  const handleRedo = () => {
    alert("Redo not implemented yet");
  };

  const handleExport = () => {
    alert("Export coming soon!");
  };

  const handleDeleteNode = () => {
    if (selectedNode && selectedNode.id !== "root") {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  };

  // Adjust node positions on window resize
  useEffect(() => {
    const handleResize = () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          position: {
            x: Math.max(25, Math.min(node.position.x, canvasWidth - 100)),
            y: Math.max(25, Math.min(node.position.y, canvasHeight - 50))
          }
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial adjustment
    return () => window.removeEventListener('resize', handleResize);
  }, [setNodes]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 px-4 py-3 sm:px-6 sm:py-4 shadow-md z-20">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 md:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate max-w-[50vw] sm:max-w-none">
                Mind Map Workspace
              </h1>
              <p className="text-xs font-medium text-gray-600">Powered by AI Brainstorm</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleUndo}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700"
              title="Undo"
              aria-label="Undo action"
            >
              <Undo2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleRedo}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700"
              title="Redo"
              aria-label="Redo action"
            >
              <Redo2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleExport}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700"
              title="Export"
              aria-label="Export mind map"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-11/12 sm:w-64 md:w-72 bg-white border-r-2 border-gray-200 p-4 sm:p-6 shadow-lg z-20 absolute md:static top-0 left-0 transition-transform duration-300 ${
            showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } overflow-y-auto`}
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <BotMessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
            <span className="font-bold text-base sm:text-lg text-blue-700">AI Assistant</span>
          </div>
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3 sm:mb-4"
            >
              <div className="font-semibold text-blue-800 text-sm sm:text-base mb-1">
                Node: {selectedNode.data.label}
              </div>
              <button
                className="mt-1 mb-2 px-3 py-1 sm:px-4 sm:py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1 disabled:bg-blue-300"
                onClick={() => handleExpandNode(selectedNode)}
                disabled={isExpanding}
                aria-label="Expand node with AI"
              >
                <Plus className="h-4 w-4" />
                {isExpanding ? "Expanding..." : "Expand via AI"}
              </button>
              <button
                onClick={handleDeleteNode}
                className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1 disabled:bg-red-300"
                disabled={!selectedNode || selectedNode.id === "root"}
                aria-label="Delete selected node"
              >
                <XCircle className="h-4 w-4" />
                Delete Node
              </button>
            </motion.div>
          ) : (
            <span className="italic text-gray-500 text-xs sm:text-sm">Click a node for options</span>
          )}
          <hr className="my-2 sm:my-3" />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-medium text-xs sm:text-sm"
            aria-label="Export mind map as PDF or image"
          >
            <Download className="h-4 w-4 sm:h-5 sm:w-5" /> Export (PDF/Image)
          </button>
          {error && <p className="text-red-600 text-xs sm:text-sm mt-2">{error}</p>}
          <div className="mt-6 sm:mt-10 text-gray-400 text-xs text-center">Powered by AI Brainstorm</div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
          <div className="h-full w-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
              fitView
              fitViewOptions={{ padding: 0.2, maxZoom: 1.5 }}
              onNodeClick={(_, node) => setSelectedNode(node)}
              style={{ width: "100%", height: "100%" }}
              minZoom={0.2}
              maxZoom={2}
            >
              <MiniMap
                nodeStrokeWidth={3}
                zoomable
                pannable
                className="w-24 h-24 sm:w-32 sm:h-32"
              />
              <Controls className="bg-white rounded shadow-md" />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </main>
      </div>
    </div>
  );
}
