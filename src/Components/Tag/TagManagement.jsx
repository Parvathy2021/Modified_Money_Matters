// TagManagement.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const TagManagement = ({ tag_id, onTagSelect }) => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#4ECDC4");
  const [error, setError] = useState("");
  const { user } = useAuth();

  // This function extracts unique tags from the nested response
  const extractUniqueTags = (response) => {
    // First, ensure we have a response to work with
    if (!response) return [];

    // Convert to array if it's not already
    const tagsArray = Array.isArray(response) ? response : [response];

    // Create a Map to store unique tags
    const uniqueTags = new Map();

    // Process each tag
    tagsArray.forEach((tag) => {
      if (tag && tag.id && !uniqueTags.has(tag.id)) {
        uniqueTags.set(tag.id, {
          tag_id: tag.id,
          name: tag.name,
          color: tag.color || "#808080", // Default color if none provided
          isDefault: !!tag.default, // Convert to boolean
        });
      }
    });

    // Convert Map values to array
    return Array.from(uniqueTags.values());
  };

  useEffect(() => {
    const fetchTags = async () => {
      if (!user?.userId) {
        console.log("No user found, skipping tag fetch");
        return;
      }

      try {
        console.log("Fetching tags for user:", user.userId);
        const response = await api.tagService.getUserTags(user.userId);
        console.log("Raw API response:", response);

        // Extract and process tags
        const processedTags = extractUniqueTags(response);
        console.log("Processed tags:", processedTags);

        if (processedTags.length > 0) {
          setTags(processedTags);
          setError("");
        } else {
          console.log("No tags found in response");
          setTags([]); // Set empty array rather than showing error
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        setError("Unable to load tags. Please try again.");
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

  // Check for existing tag with same name
  const tagExists = tags.some(
    (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
  );
  if (tagExists) {
    setError("A tag with this name already exists");
    return;
  }

  const tagData = {
    name: newTagName,
    color: newTagColor,
    isDefault: false,
  };

  try {
    console.log("Creating new tag:", tagData);
    const response = await api.tagService.createTag(tagData, user.userId);

    if (response && response.id) {
      const newTag = {
        tag_id: response.id,
        name: response.name,
        color: response.color,
        isDefault: response.default,
      };
      setTags((prevTags) => [...prevTags, newTag]);
      setNewTagName("");
      setNewTagColor("#4ECDC4");
      setError("");
    }
  } catch (error) {
    console.error("Error creating tag:", error);
    const errorMessage =
      error.response?.data || "Failed to create tag. Please try again.";
    setError(errorMessage);
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

      <div className="mb-6">
        <h3 className="font-medium mb-2">Your Tags</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {tags.map((tag) => (
            <div
              key={tag.tag_id}
              data-tag-id={tag.tag_id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all
                                ${
                                  tag_id === tag.tag_id
                                    ? "ring-2 ring-blue-500 shadow-lg"
                                    : "hover:shadow-md"
                                }`}
              style={{ backgroundColor: `${tag.color}20` }}
            >
              <div 
              key={tag.tag_id}
              data-tag-id={tag.tag_id}
              onClick={() => onTagSelect(tag.tag_id)}
              className= {`flex items-center p-3 rounded-lg cursor pointer transition-all
                ${
                  tag_id === tag.tag_id
                  ? "ring-2 riing-blue-500 shadow-lg"
                  : "hover:shadow-md"
                }`}
                style={{backgroundColor: `${tag.color}20`, minWidth: '0'}}
                >
                  <span
                  className="w-4 h-4 rounded-full mr-2"
                  style={{backgroundColor: tag.color}}
                  />
                  <span className="text-gray-800 whitepsace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0">{tag.name}</span>
                  <span 
                  className="m1-2 text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagSelect(tag.tag_id);
                  }}
                  ></span>
                  </div>

              {/* <span
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: tag.color }}
              />
              <span className="text-gray-800 truncate">{tag.name}</span>
              <button
                type="button"
                onClick={() => onTagSelect(tag.tag_id)}
                className="ml-auto text-sm text-blue-500 hover:text-blue-600"
              >
                Select
              </button> */}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Add New Tag</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Tag name"
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="color"
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
            className="w-12 h-10 p-1 border rounded cursor-pointer"
            title="Choose tag color"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagManagement;
