// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { token, logout } = useAuth();
  const activeLinkStyle = { /* ... 样式保持不变 ... */ };

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-cyan-400 transition-colors">
          全栈数字内容平台
        </Link>
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <NavLink to="/" /* ... */>Home</NavLink>
          <NavLink to="/projects" /* ... */>Projects</NavLink>
          <NavLink to="/blog" /* ... */>Blog</NavLink>
          <NavLink to="/contact" /* ... */>Contact</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              <Link to="/admin" className="hover:text-cyan-400 font-semibold">Dashboard</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-bold transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-cyan-400">Login</Link>
              <Link to="/register" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
