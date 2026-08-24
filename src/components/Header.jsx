import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800 text-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo 区域 */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent hover:opacity-90 transition"
        >
          全栈数字内容平台
        </Link>

        {/* 主导航菜单 */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-blue-400 transition">首页</Link>
          <Link to="/projects" className="hover:text-blue-400 transition">工程项目</Link>
          <Link to="/blog" className="hover:text-blue-400 transition">技术博客</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">联系交流</Link>
          {token && (
            <Link to="/admin" className="text-amber-400 hover:text-amber-300 transition">管理后台</Link>
          )}
        </nav>

        {/* 用户登录 / 注册按钮 */}
        <div className="flex items-center space-x-3">
          {token ? (
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-red-400 border border-gray-700 transition"
            >
              退出登录
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-lg text-gray-300 hover:text-white transition"
              >
                登录
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20 transition"
              >
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
