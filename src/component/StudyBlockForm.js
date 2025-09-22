'use client';

import { useState } from "react";
import { Plus } from "lucide-react";

const StudyBlockForm = ({ userId, onBlockAdded }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !startTime || !endTime) {
      alert('Please fill in all fields');
      return;
    }

    if (!userId) {
      alert('Please log in to add study blocks');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/blocks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          title,
          start_time: startTime,
          end_time: endTime,
        }),
      });
      
      if (res.ok) {
        // Clear form
        setTitle("");
        setStartTime("");
        setEndTime("");
        
        // Notify parent component to refresh the list
        onBlockAdded?.();
        
        alert('Study block added successfully!');
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to add study block'}`);
      }
    } catch (error) {
      console.error('Error adding block:', error);
      alert('Failed to add study block. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-md border border-gray-700/40 shadow-lg rounded-xl p-6  w-full max-w-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="flex items-center text-xl font-semibold text-white">
          <Plus className="h-5 w-5 text-teal-400 mr-2" />
          Add Study Block
        </h2>
        <p className="text-md text-gray-400">
          Schedule a new quiet study session
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-md text-gray-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g., Deep Focus Session"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900/60 border border-gray-700 text-gray-200 placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Time inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="startTime" className="text-md text-gray-300">
              Start Time
            </label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="endTime" className="text-md text-gray-300">
              End Time
            </label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          {isSubmitting ? 'Adding...' : 'Add Study Block'}
        </button>
      </form>
    </div>
  );
};

export default StudyBlockForm;
