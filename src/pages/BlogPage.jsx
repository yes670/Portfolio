import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  // 优质兜底博客数据
  const defaultBlogs = [
    {
      _id: '1',
      title: '深入浅出现代 Web 架构：从单体到前后端分离与微服务',
      content: '本文探讨了现代 Web 工程中前端 SPA 架构、RESTful API 设计范式与无状态 JWT 鉴权的实践落地经验...',
      createdAt: new Date().toISOString(),
      author: '叶胜',
    },
    {
      _id: '2',
      title: '基于 React 18 的首屏渲染与路由级代码分割性能优化',
      content: '分析 Web 性能核心指标（LCP、FCP），并结合 React.lazy、Suspense 与 CDN 边缘缓存进行全链路性能优化实战...',
      createdAt: new Date().toISOString(),
      author: '叶胜',
    },
  ];

  const [blogs, setBlogs] = useState(defaultBlogs);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch('https://capstone-api-yes670.onrender.com/api/blogs', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        }
      })
      .catch(() => {
        // 请求失败或超时使用 defaultBlogs
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">技术博客与工程思考</h1>
        <p className="text-gray-400 text-sm">记录全栈开发、系统架构、算法实践与计算机前沿技术的思考与沉淀</p>
      </div>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="p-6 rounded-2xl bg-gray-800/40 border border-gray-800 hover:border-gray-700 transition"
          >
            <h2 className="text-xl font-bold text-white hover:text-blue-400 transition mb-2">
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {blog.content}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>作者：{blog.author || '叶胜'}</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
