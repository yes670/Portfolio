import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center space-y-2">
        <p className="text-sm">
          © {new Date().getFullYear()} 叶盛 · 保留所有权利 | 基于 MERN 架构的高可用数字内容管理与展示系统
        </p>
        <p className="text-xs text-gray-500">
          采用 React 18、Tailwind CSS、Node.js 与 MongoDB 构建 · 托管于 Vercel 与 Render
        </p>
      </div>
    </footer>
  );
}
