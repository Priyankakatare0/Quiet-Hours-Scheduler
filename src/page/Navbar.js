'use client';

import { LogOut, Moon } from "lucide-react";
import { supabase } from "../../utils/supabaseClient";

const Header = () => {

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        alert('Error signing out. Please try again.');
      } else {
        // Redirect to landing page
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error signing out. Please try again.');
    }
  };

return (
  <header className="sticky top-0 z-50 w-full bg-gray-900/90  border-border/40 bg-card-translucent backdrop-blur supports-[backdrop-filter]:bg-card/60">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      {/* Left Section: Logo + Title */}
      <div className="flex items-center space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 shadow-glow">
          <Moon className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Quiet Hours Scheduler
        </h1>
      </div>

      {/* Right Section: Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center text-gray-300 text-md px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-secondary/100  transition-colors"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </button>
    </div>
  </header>
);
};

export default Header;
