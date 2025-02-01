import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const TagManagement = ({ selectedTagId, onTagSelect }) => {
  // Changed prop names
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#808080");
  const [error, setError] = useState("");
  const { user } = useAuth();


  useEffect(() => {
    const fetchTags = async () => {
      if (!user?.userId) return;

      try {
        const response = await api.get(`/api/tags/user/${user.userId}`);
        setTags(response.data);
      } catch (err) {
        setError("Failed to fetch tags");
        console.error("Error fetching tags:", err);
      }
    };

    fetchTags();
  }, [user]);

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim()) {
      setError("Tag name is required");
      return;
    }

    try {
      const response = await api.post(
        "/api/tags/add",
        {
          name: newTagName,
          color: newTagColor,
          isDefault: false,
        },
        {
          params: { user_id: user.userId },
        }
      );

      setTags([...tags, response.data]);
      setNewTagName("");
      setNewTagColor("#808080");
      setError("");
    } catch (err) {
      setError(err.response?.data || "Failed to create tag");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Tags</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tag List */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Your Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className={`flex items-center px-3 py-1 rounded-full text-sm
                ${selectedTagId === tag.id ? "ring-2 ring-blue-500" : ""}`}
              style={{ backgroundColor: tag.color + "40" }}
            >
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: tag.color }}
              />
              <span className="mr-2">{tag.name}</span>
              <button
                onClick={() => onTagSelect(tag.id)} // Changed to pass just the ID
                className="hover:text-blue-600 mr-1"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Tag Form */}
      <form onSubmit={handleAddTag} className="space-y-4">
        <h3 className="font-medium">Add New Tag</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Tag name"
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="color"
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
            className="w-12 h-10 p-1 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Tag
          </button>
        </div>
      </form>
    </div>
  );
};

export default TagManagement;
