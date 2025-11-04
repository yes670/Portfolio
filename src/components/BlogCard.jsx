// src/components/BlogCard.jsx --- 修改后的最终版本

import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
 
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
      <h2 className="text-3xl font-bold mb-2">
        <Link to={`/blog/${post._id}`} className="hover:text-cyan-400">{post.title}</Link>
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{formattedDate}</p>
      
      {/* 2. 修改摘要逻辑，只显示 content 的前150个字符 */}
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {post.content.substring(0, 150) + '...'}
      </p>
      
      {/* 3. 翻译“阅读更多” */}
      <Link to={`/blog/${post._id}`} className="font-semibold text-cyan-500 hover:text-cyan-600">
        Read More &rarr;
      </Link>
    </div>
  );
}