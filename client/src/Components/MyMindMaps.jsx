
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
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Library Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 flex items-center gap-2">
          <List className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" /> My Mind Maps
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded ${view === "grid" ? "bg-blue-200 text-blue-700" : "hover:bg-blue-100"}`}
            title="Grid View"
            aria-label="Switch to grid view"
          >
            <Grid3x3 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${view === "list" ? "bg-blue-200 text-blue-700" : "hover:bg-blue-100"}`}
            title="List View"
            aria-label="Switch to list view"
          >
            <List className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="flex flex-col gap-3 mb-5 sm:mb-6">
        <div className="flex items-center w-full bg-white border border-blue-100 px-3 py-2 rounded-lg shadow-sm">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mind maps or tags…"
            className="flex-grow outline-none bg-transparent text-sm sm:text-base text-gray-700"
            aria-label="Search mind maps"
          />
        </div>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 items-center"
          >
            <span className="text-xs sm:text-sm text-gray-600">{selected.length} selected</span>
            <button
              className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 transition text-xs sm:text-sm"
              onClick={() => setConfirmDelete(true)}
              aria-label="Delete selected mind maps"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded shadow-sm hover:bg-blue-200 transition text-xs sm:text-sm"
              onClick={() => alert("Export coming soon!")}
              aria-label="Export selected mind maps"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
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
                  className={`bg-white border border-blue-100 rounded-lg shadow-sm hover:shadow-md p-3 sm:p-4 group ${
                    selected.includes(map.id) ? "ring-2 ring-blue-300" : ""
                  } transition`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => toggleSelect(map.id)}
                      className={`w-5 h-5 rounded-full border-2 sm:w-6 sm:h-6 ${
                        selected.includes(map.id)
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      } transition`}
                      title="Select mind map"
                      aria-label={`Select ${map.title}`}
                    />
                    <span className="text-xs text-gray-400">{map.date}</span>
                  </div>
                  <div className="font-bold text-base sm:text-lg text-blue-800 mb-1 truncate">
                    {map.title}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {map.excerpt.map((tag, j) => (
                      <span
                        className="bg-blue-100/70 text-xs text-blue-600 px-1.5 sm:px-2 py-0.5 rounded"
                        key={j}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <span className="text-xs text-gray-500">{map.nodes} nodes</span>
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        className="p-1.5 sm:p-2 rounded hover:bg-blue-50"
                        title="View mind map"
                        onClick={() => window.location.href = `/mindmap/${map.id}`}
                        aria-label={`View ${map.title}`}
                      >
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </button>
                      <button
                        className="p-1.5 sm:p-2 rounded hover:bg-blue-50"
                        title="Export mind map"
                        onClick={() => alert("Export coming soon!")}
                        aria-label={`Export ${map.title}`}
                      >
                        <Download className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div className="col-span-full text-center text-gray-400 py-10 sm:py-12 text-sm sm:text-base">
                No mind maps found.
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <table className="min-w-full bg-white border border-blue-100 rounded-lg shadow-sm">
              <thead>
                <tr className="text-blue-700 font-semibold text-xs sm:text-sm text-left">
                  <th className="p-2 sm:p-3">Select</th>
                  <th className="p-2 sm:p-3">Title</th>
                  <th className="p-2 sm:p-3 hidden sm:table-cell">Tags</th>
                  <th className="p-2 sm:p-3 hidden md:table-cell">Nodes</th>
                  <th className="p-2 sm:p-3 hidden md:table-cell">Date</th>
                  <th className="p-2 sm:p-3">Actions</th>
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
                          ? "bg-blue-50 ring-2 ring-blue-300"
                          : ""
                      }
                    >
                      <td className="p-2 sm:p-3">
                        <button
                          onClick={() => toggleSelect(map.id)}
                          className={`w-5 h-5 rounded-full border-2 sm:w-6 sm:h-6 ${
                            selected.includes(map.id)
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300"
                          } transition`}
                          title="Select mind map"
                          aria-label={`Select ${map.title}`}
                        />
                      </td>
                      <td className="p-2 sm:p-3 font-bold text-blue-800 text-sm sm:text-base truncate max-w-[30vw] sm:max-w-none">
                        {map.title}
                      </td>
                      <td className="p-2 sm:p-3 hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {map.excerpt.map((tag, j) => (
                            <span
                              className="bg-blue-100/80 text-xs text-blue-600 px-1.5 sm:px-2 py-0.5 rounded"
                              key={j}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 hidden md:table-cell text-sm">
                        {map.nodes}
                      </td>
                      <td className="p-2 sm:p-3 hidden md:table-cell text-xs text-gray-400">
                        {map.date}
                      </td>
                      <td className="p-2 sm:p-3 flex gap-1 sm:gap-2">
                        <button
                          className="p-1.5 sm:p-2 rounded hover:bg-blue-50"
                          title="View mind map"
                          onClick={() => window.location.href = `/mindmap/${map.id}`}
                          aria-label={`View ${map.title}`}
                        >
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </button>
                        <button
                          className="p-1.5 sm:p-2 rounded hover:bg-blue-50"
                          title="Export mind map"
                          onClick={() => alert("Export coming soon!")}
                          aria-label={`Export ${map.title}`}
                        >
                          <Download className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 sm:py-12 text-center text-gray-400 text-sm sm:text-base">
                      No mind maps found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm bulk delete modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col items-center gap-3 sm:gap-4 w-full max-w-md"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <XCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
              <div className="font-bold text-base sm:text-lg text-red-700 text-center">
                Delete {selected.length} mind map{selected.length > 1 ? "s" : ""}?
              </div>
              <div className="text-gray-500 text-sm sm:text-base mb-2 sm:mb-4 text-center">
                This action is irreversible. Are you sure?
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm sm:text-base"
                  aria-label="Confirm delete"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm sm:text-base"
                  aria-label="Cancel delete"
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
