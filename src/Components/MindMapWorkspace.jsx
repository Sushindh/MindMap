import React, { useState, useCallback } from "react";
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
  XCircle
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

  const handleExpandNode = useCallback(
    async (node) => {
      setIsExpanding(true);
      setError("");
      try {
        // Placeholder: expand with dummy ideas, replace with API call if needed
        const newId1 = `${node.id}-a-${Math.random().toString(16).slice(2, 5)}`;
        const newId2 = `${node.id}-b-${Math.random().toString(16).slice(2, 5)}`;
        setNodes((nds) => [
          ...nds,
          {
            id: newId1,
            data: { label: `Idea for ${node.data.label}` },
            position: {
              x: node.position.x + 120,
              y: node.position.y + Math.random() * 120 - 60
            }
          },
          {
            id: newId2,
            data: { label: `Inspire from ${node.data.label}` },
            position: {
              x: node.position.x - 120,
              y: node.position.y + Math.random() * 120 - 60
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

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <aside className="w-full md:w-60 bg-white border-r flex flex-col justify-between px-4 py-6 shadow-lg z-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BotMessageSquare className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-lg text-blue-700">AI Assistant</span>
          </div>
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3"
            >
              <div className="font-semibold text-blue-800 mb-1">
                Node: {selectedNode.data.label}
              </div>
              <button
                className="mt-1 mb-2 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 disabled:bg-blue-300"
                onClick={() => handleExpandNode(selectedNode)}
                disabled={isExpanding}
              >
                <Plus className="h-4 w-4" />
                {isExpanding ? "Expanding..." : "Expand via AI"}
              </button>
            </motion.div>
          ) : (
            <span className="italic text-gray-500 text-sm">Click a node for options</span>
          )}
          <hr className="my-2" />
          <div className="flex flex-col gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-medium"
            >
              <Download className="h-4 w-4" /> Export (PDF/Image)
            </button>
            <button
              onClick={handleDeleteNode}
              className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium"
              disabled={!selectedNode || selectedNode.id === "root"}
            >
              <XCircle className="h-4 w-4" /> Delete Node
            </button>
          </div>
          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
        </div>
        <div className="mt-10 text-gray-400 text-xs text-center">Powered by AI Brainstorm</div>
      </aside>

      <main className="flex-1 relative h-[80vh] md:h-full">
        <motion.div
          className="flex gap-2 items-center absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white bg-opacity-70 rounded-full px-4 shadow"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            className="px-3 py-2 rounded-full hover:bg-blue-100 transition"
            onClick={handleUndo}
            title="Undo"
          >
            <Undo2 className="h-5 w-5 text-blue-700" />
          </button>
          <button
            className="px-3 py-2 rounded-full hover:bg-blue-100 transition"
            onClick={handleRedo}
            title="Redo"
          >
            <Redo2 className="h-5 w-5 text-blue-700" />
          </button>
          <button
            className="px-3 py-2 rounded-full hover:bg-blue-100 transition"
            onClick={handleExport}
            title="Export"
          >
            <Download className="h-5 w-5 text-blue-700" />
          </button>
        </motion.div>

        <div className="h-full min-h-[80vh] bg-transparent">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
            fitView
            onNodeClick={(_, node) => setSelectedNode(node)}
            style={{ width: "100%", height: "100%" }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </main>
    </div>
  );
}


