'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import StudyBlockForm from "./StudyBlockForm";
import StudyBlockList from "./StudyBlockList";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get current user
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (!user) {
          // Redirect to login if not authenticated
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error getting user:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  // Function to refresh the study blocks list
  const handleBlockAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#012e2e] to-gray-900 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#012e2e] to-gray-900 text-gray-200 px-6 py-10">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Plan Your Perfect Study Sessions
        </h1>
        <p className="text-lg  md:text-xl text-gray-300  mt-4">
          Create distraction-free study blocks and maximize your productivity with <br /> focused quiet hours.
        </p>
      </div>

      {/* Main content: two columns */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center">
        
        {/* Form Column */}
        <div className="md:w-1/3 p-8 rounded-2xl shadow-lg">
          <StudyBlockForm userId={user.id} onBlockAdded={handleBlockAdded} />
        </div>

        {/* Study Blocks List Column */}
        <div className="md:w-1/2  p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>📚</span> Your Study Blocks
          </h2>
          <StudyBlockList userId={user.id} refreshKey={refreshKey} />
        </div>

      </div>
    </div>
  );
}
