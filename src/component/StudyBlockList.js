'use client';

import { Clock, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function StudyBlockList({ userId, refreshKey }) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    fetch(`/api/blocks/get?user_id=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        console.log('API response:', data); // Debug log
        if (Array.isArray(data)) {
          setBlocks(data);
        } else if (data.error) {
          setError(data.error);
          setBlocks([]);
        } else {
          setError('Unexpected response format');
          setBlocks([]);
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch blocks');
        setBlocks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, refreshKey]);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return "";
    const startMinutes =
      parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1]);
    const endMinutes =
      parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);
    const duration = endMinutes - startMinutes;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="bg-[#0f172a]/80 backdrop-blur-md border border-gray-700/40 shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mb-4"></div>
          <p className="text-gray-400">Loading your study blocks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0f172a]/80 backdrop-blur-md border border-gray-700/40 shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Error Loading Blocks
          </h3>
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!blocks || blocks.length === 0) {
    return (
      <div className="bg-[#0f172a]/80 backdrop-blur-md border border-gray-700/40 shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No Study Blocks Yet
          </h3>
          <p className="text-gray-400">
            Add your first quiet study session to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
    
      {/* Study Block Cards */}
      <div className="grid gap-4">
        {blocks.map((block) => (
          <div
            key={block._id}
            className="bg-[#0f172a]/80 backdrop-blur-md border border-gray-700/40 shadow-lg rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:border-teal-500/30"
          >
            <h3 className="text-lg font-semibold text-white mb-3">
              {block.title}
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              {/* Time */}
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {formatTime(block.start_time)} - {formatTime(block.end_time)}
                </span>
              </div>

              {/* Duration Badge */}
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-teal-600/20 text-teal-300 border border-teal-600/30">
                {calculateDuration(block.start_time, block.end_time)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
