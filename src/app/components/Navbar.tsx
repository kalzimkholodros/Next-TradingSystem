"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "../store/useStore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { user, setUser } = useStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoginModalOpen(false);
      } else {
        // Handle error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsSignupModalOpen(false);
      } else {
        // Handle error
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="border-b border-[#39FF14]/20 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-wider hover:text-[#39FF14]/80 transition-all duration-300 hover:scale-105 group">
                NEON<span className="text-white group-hover:text-[#39FF14] transition-colors duration-300">DASH</span>
                <div className="h-0.5 w-0 group-hover:w-full bg-[#39FF14] transition-all duration-300"></div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="group relative px-4 py-2 rounded-md overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Dashboard</span>
                <div className="absolute inset-0 bg-[#39FF14]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 border border-[#39FF14]/20 group-hover:border-[#39FF14] transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#39FF14] transition-all duration-300"></div>
              </Link>
              <Link href="/coins" className="group relative px-4 py-2 rounded-md overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Coins</span>
                <div className="absolute inset-0 bg-[#39FF14]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 border border-[#39FF14]/20 group-hover:border-[#39FF14] transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#39FF14] transition-all duration-300"></div>
              </Link>
              <Link href="/projects" className="group relative px-4 py-2 rounded-md overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Projects</span>
                <div className="absolute inset-0 bg-[#39FF14]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 border border-[#39FF14]/20 group-hover:border-[#39FF14] transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#39FF14] transition-all duration-300"></div>
              </Link>
              <Link href="/about" className="group relative px-4 py-2 rounded-md overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">About</span>
                <div className="absolute inset-0 bg-[#39FF14]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 border border-[#39FF14]/20 group-hover:border-[#39FF14] transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#39FF14] transition-all duration-300"></div>
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-[#39FF14]">{user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="relative px-4 py-2 overflow-hidden rounded-md border border-[#39FF14]/50 hover:border-[#39FF14] transition-colors duration-300 group"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Logout</span>
                    <div className="absolute inset-0 bg-[#39FF14]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="relative px-4 py-2 overflow-hidden rounded-md border border-[#39FF14]/50 hover:border-[#39FF14] transition-colors duration-300 group"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Login</span>
                    <div className="absolute inset-0 bg-[#39FF14]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                  <button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="relative px-4 py-2 overflow-hidden rounded-md border border-[#39FF14] bg-[#39FF14]/10 hover:bg-[#39FF14]/20 transition-colors duration-300 group"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Sign Up</span>
                    <div className="absolute inset-0 bg-[#39FF14]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group relative w-10 h-10 flex items-center justify-center rounded-md border border-[#39FF14]/20 hover:border-[#39FF14]/60 transition-colors duration-300"
              >
                <div className={`w-5 h-0.5 bg-[#39FF14] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : ''} absolute`}></div>
                <div className={`w-5 h-0.5 bg-[#39FF14] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-[#39FF14] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''} absolute`}></div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
            <div className="py-4 space-y-2">
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-[#39FF14]/10 rounded-md transition-colors duration-300">
                Dashboard
              </Link>
              <Link href="/coins" className="block px-4 py-2 hover:bg-[#39FF14]/10 rounded-md transition-colors duration-300">
                Coins
              </Link>
              <Link href="/projects" className="block px-4 py-2 hover:bg-[#39FF14]/10 rounded-md transition-colors duration-300">
                Projects
              </Link>
              <Link href="/about" className="block px-4 py-2 hover:bg-[#39FF14]/10 rounded-md transition-colors duration-300">
                About
              </Link>
              {user ? (
                <>
                  <div className="px-4 py-2 text-[#39FF14]">{user.name}</div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#39FF14]/10 rounded-md transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-[#39FF14]/10 rounded-md transition-colors duration-300"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-[#39FF14]/10 rounded-md transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)}></div>
          <div className="relative bg-black/90 p-8 rounded-xl border border-[#39FF14]/20 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 bg-black border border-[#39FF14]/20 rounded-md focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 bg-black border border-[#39FF14]/20 rounded-md focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14] rounded-md hover:bg-[#39FF14]/20 transition-colors duration-300"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-[#39FF14]/70 hover:text-[#39FF14]"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSignupModalOpen(false)}></div>
          <div className="relative bg-black/90 p-8 rounded-xl border border-[#39FF14]/20 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 bg-black border border-[#39FF14]/20 rounded-md focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  className="w-full px-4 py-2 bg-black border border-[#39FF14]/20 rounded-md focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  className="w-full px-4 py-2 bg-black border border-[#39FF14]/20 rounded-md focus:border-[#39FF14] focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14] rounded-md hover:bg-[#39FF14]/20 transition-colors duration-300"
              >
                Sign Up
              </button>
            </form>
            <button
              onClick={() => setIsSignupModalOpen(false)}
              className="absolute top-4 right-4 text-[#39FF14]/70 hover:text-[#39FF14]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
} 