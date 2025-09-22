'use client';

import { Moon, Clock, Calendar, Shield } from "lucide-react";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#012e2e] to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-700/40 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600/20 shadow-lg">
              <Moon className="h-5 w-5 text-teal-400" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Quiet Hours Scheduler
            </h1>
          </div>

          <Link href="/login">
            <button className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-4 py-2 rounded-md">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center space-y-8 mb-20">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Focus Better with
                <span className="block text-transparent bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text">
                  Quiet Hours
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                Create distraction-free study blocks and maximize your productivity with focused quiet hours. Plan your perfect study sessions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <button className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 text-lg rounded-md">
                  Start Planning
                </button>
              </Link>
              <button className="border border-teal-600 text-white px-8 py-3 text-lg rounded-md hover:bg-gray-800">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-black/80 border border-gray-700/50 shadow-lg backdrop-blur-md p-8 text-center space-y-4 rounded-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600/20 shadow-lg mx-auto">
                <Clock className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Time Blocking</h3>
              <p className="text-gray-400">
                Create focused study blocks with specific start and end times to maximize your productivity.
              </p>
            </div>

            <div className="bg-black/80 border border-gray-700/50 shadow-lg backdrop-blur-md p-8 text-center space-y-4 rounded-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600/20 shadow-lg mx-auto">
                <Calendar className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Easy Scheduling</h3>
              <p className="text-gray-400">
                Simple and intuitive interface to plan your study sessions without any distractions.
              </p>
            </div>

            <div className="bg-black/80 border border-gray-700/50 shadow-lg backdrop-blur-md p-8 text-center space-y-4 rounded-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600/20 shadow-lg mx-auto">
                <Shield className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Focus Protection</h3>
              <p className="text-gray-400">
                Maintain your quiet hours and protect your focused study time from interruptions.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Study Sessions?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join thousands of students who have improved their productivity with structured quiet hours.
            </p>
            <Link href="/login">
              <button className="bg-teal-600 hover:bg-teal-500 text-white px-12 py-4 text-lg rounded-md">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
