import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://capstone-api-yes670.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } else {
        setError(data.message || '登录失败，请检查账号密码');
      }
    } catch {
      setError('网络请求失败，请稍后重试');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-800 shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">系统身份认证</h1>
        {error && <div className="p-3 mb-4 text-xs text-red-400 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">电子邮箱</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">登录密码</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition"
          >
            登 录
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-4">
          尚未注册账号？ <Link to="/register" className="text-blue-400 hover:underline">立即注册</Link>
        </p>
      </div>
    </div>
  );
}
