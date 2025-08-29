import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  List,
  Grid3x3,
  Search,
  Download,
  Trash2,
  Eye,
  XCircle
} from "lucide-react";

// Mock data for demonstration
const initialMaps = [
  {
    id: 1,
    title: "Startup Launch Plan",
    date: "Aug 27, 2025",
    nodes: 20,
    excerpt: ["Funding", "MVP", "Go-to-Market", "User Feedback"]
  },
  {
    id: 2,
    title: "Novel Plot Web",
    date: "Aug 25, 2025",
    nodes: 17,
    excerpt: ["Antagonist", "Act 1", "Plot Twist", "Resolution"]
  },
  {
    id: 3,
    title: "Marketing Campaign",
    date: "Aug 22, 2025",
    nodes: 23,
    excerpt: ["Channels", "Persona", "Messaging", "KPIs"]
  }
];

export default function MyMindMaps() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid"); // "grid" or "list"
  const [maps, setMaps] = useState(initialMaps);
  const [selected, setSelected] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const filtered = maps.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.excerpt.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const toggleSelect = (id) =>
    setSelected((sel) =>
      sel.includes(id) ? sel.filter((i) => i !== id) : [...sel, id]
    );

  const handleDelete = () => {
    setMaps((m) => m.filter((map) => !selected.includes(map.id)));
    setSelected([]);
    setConfirmDelete(false);
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Library Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 flex items-center gap-2">
          <List className="h-6 w-6 text-blue-500" /> My Mind Maps
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded ${view === "grid" ? "bg-blue-200 text-blue-700" : "hover:bg-blue-100"}`}
            title="Grid View"
          >
            <Grid3x3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${view === "list" ? "bg-blue-200 text-blue-700" : "hover:bg-blue-100"}`}
            title="List View"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Search and Bulk Actions */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        <div className="flex items-center w-full md:w-1/2 bg-white border border-blue-100 px-3 py-2 rounded-lg shadow">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mind maps or tags…"
            className="flex-grow outline-none bg-transparent"
          />
        </div>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 items-center"
          >
            <span className="text-sm text-gray-600">{selected.length} selected</span>
            <button
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded shadow hover:bg-blue-200 transition"
              onClick={() => alert("Export coming soon!")}
            >
              <Download className="h-4 w-4" /> Export All
            </button>
          </motion.div>
        )}
      </div>

      {/* Maps List/Grid */}
      <AnimatePresence>
        {view === "grid" ? (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.length ? (
              filtered.map((map) => (
                <motion.div
                  key={map.id}
                  layout
                  initial={{ scale: 0.97, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  className={`bg-white border border-blue-100 rounded-lg shadow hover:shadow-lg p-4 group ${
                    selected.includes(map.id) ? "ring ring-blue-300" : ""
                  } transition`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => toggleSelect(map.id)}
                      className={`w-5 h-5 rounded-full border-2 mr-2 ${
                        selected.includes(map.id)
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      } transition`}
                      title="Select"
                    />
                    <span className="text-xs text-gray-400">{map.date}</span>
                  </div>
                  <div className="font-bold text-lg text-blue-800 mb-1 truncate">
                    {map.title}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {map.excerpt.map((tag, j) => (
                      <span
                        className="bg-blue-100/70 text-xs text-blue-600 px-2 py-0.5 rounded"
                        key={j}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{map.nodes} nodes</span>
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded hover:bg-blue-50"
                        title="View"
                        onClick={() => window.location.href = `/mindmap/${map.id}`}
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        className="p-2 rounded hover:bg-blue-50"
                        title="Export"
                        onClick={() => alert("Export coming soon!")}
                      >
                        <Download className="h-4 w-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div className="col-span-full text-center text-gray-400 py-12">
                No mind maps found.
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.table
            layout
            className="min-w-full bg-white border border-blue-100 rounded-lg shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <thead>
              <tr className="text-blue-700 font-semibold text-left">
                <th className="p-3">Select</th>
                <th className="p-3">Title</th>
                <th className="p-3">Tags</th>
                <th className="p-3">Nodes</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length ? (
                filtered.map((map) => (
                  <motion.tr
                    key={map.id}
                    layout
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    className={
                      selected.includes(map.id)
                        ? "bg-blue-50 ring ring-blue-300"
                        : ""
                    }
                  >
                    <td className="p-3">
                      <button
                        onClick={() => toggleSelect(map.id)}
                        className={`w-5 h-5 rounded-full border-2 ${
                          selected.includes(map.id)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        } transition`}
                        title="Select"
                      />
                    </td>
                    <td className="p-3 font-bold text-blue-800">{map.title}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {map.excerpt.map((tag, j) => (
                          <span
                            className="bg-blue-100/80 text-xs text-blue-600 px-2 py-0.5 rounded"
                            key={j}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{map.nodes}</td>
                    <td className="p-3 text-xs text-gray-400">{map.date}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="p-2 rounded hover:bg-blue-50"
                        title="View"
                        onClick={() => window.location.href = `/mindmap/${map.id}`}
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        className="p-2 rounded hover:bg-blue-50"
                        title="Export"
                        onClick={() => alert("Export coming soon!")}
                      >
                        <Download className="h-4 w-4 text-blue-600" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No mind maps found.
                  </td>
                </tr>
              )}
            </tbody>
          </motion.table>
        )}
      </AnimatePresence>

      {/* Confirm bulk delete modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <XCircle className="h-10 w-10 text-red-500" />
              <div className="font-bold text-lg text-red-700">
                Delete {selected.length} mind map{selected.length > 1 ? "s" : ""}?
              </div>
              <div className="text-gray-500 mb-4 text-center">
                This action is irreversible. Are you sure?
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-5 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

