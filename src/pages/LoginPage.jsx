import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 引入全局鉴权状态

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://capstone-api-yes670.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 1. 保存 Token
        const token = data.token || (data.user && data.user.token);
        if (token) localStorage.setItem('token', token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

        // 2. 如果项目使用了 Context，同步更新状态
        if (authContext && authContext.login) {
          authContext.login(data.user, token);
        }

        // 3. 跳转到管理后台
        navigate('/admin');
      } else {
        setError(data.message || '登录失败，请检查邮箱或密码');
      }
    } catch {
      setError('网络连接异常，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-800 shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">系统身份认证</h1>
        
        {error && (
          <div className="p-3 mb-4 text-xs text-red-400 bg-red-500/10 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">电子邮箱</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="请输入管理员邮箱"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">登录密码</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? '正在验证身份...' : '登 录'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          尚未注册账号？ <Link to="/register" className="text-blue-400 hover:underline">立即注册</Link>
        </p>
      </div>
    </div>
  );
}
