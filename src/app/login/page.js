'use client';
import { useState } from 'react';
import { supabase } from '../../../utils/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Check your email for the magic link!');
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-[#012e2e] to-gray-900 relative">
      {/* Background spotlight effect */}
      <div className="absolute inset-0 flex items-start justify-center">
        <div className="h-94 w-104 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Center Content */}
      <div className="text-center absolute top-18 ">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-200">
          Build with Confidence
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-teal-400 mt-2 ">
          Deploy with Ease
        </p>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative mt-6 z-10 bg-black/50 p-10 rounded-2xl shadow-xl flex flex-col gap-4 w-100 h-100"
      >
        <h2 className="text-xl font-bold text-white text-center ">Welcome Back</h2>
        <p className="text-sm text-gray-400 text-center mb-2">
          Login to your account to continue
        </p>

        <div className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-700 bg-gray-900 text-gray-200 placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button className="bg-teal-600 hover:bg-teal-700 transition text-white font-semibold p-3 rounded-lg shadow-lg">
            Send Magic Link
          </button>
          <div className="flex items-center mb-2">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">Or Login With</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>  
          <button
            type="button"
            onClick={async () => {
              try {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: { redirectTo: 'https://quiet-hours-scheduler-pt64.vercel.app/' }
                });
                if (error) {
                  console.error('OAuth error:', error);
                  alert(`OAuth error: ${error.message}`);
                }
              } catch (err) {
                console.error('Unexpected error:', err);
                alert('Google sign-in is not available at the moment. Please try email login instead.');
              }
            }}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Continue with Google
          </button>

        </div>
      </form>


      {/* Footer */}
      <div className="absolute bottom-4 text-gray-500 text-xs">
        ©2025 abcd Ltd. All rights reserved.
      </div>
    </div>
  );
}
