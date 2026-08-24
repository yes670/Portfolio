import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">联系与学术交流</h1>
        <p className="text-gray-400 text-sm">欢迎就软件工程、全栈架构及科研合作进行探讨</p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center">
          ✓ 感谢您的留言！消息已成功送达。
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800/40 p-8 rounded-2xl border border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">您的姓名 / 称呼</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="请输入您的姓名"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">电子邮箱</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">交流主题与留言内容</label>
            <textarea
              rows="4"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="请输入您想交流的内容..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20 transition"
          >
            发送留言
          </button>
        </form>
      )}
    </div>
  );
}
