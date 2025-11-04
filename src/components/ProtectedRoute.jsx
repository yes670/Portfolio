// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  // 从我们的 AuthContext 中获取 token
  const { token } = useAuth();

  // 检查 token 是否存在
  if (!token) {
    // 如果 token 不存在（意味着用户未登录），
    // 就将用户重定向到登录页面。
    // `replace` 属性可以防止用户通过浏览器的“后退”按钮回到之前的受保护页面。
    return <Navigate to="/login" replace />;
  }

  // 如果 token 存在（用户已登录），
  // 就渲染 <Outlet />。<Outlet /> 代表了这个受保护路由下的所有子路由。
  // 在我们的例子中，它就代表 <AdminDashboard /> 组件。
  return <Outlet />;
};

export default ProtectedRoute;