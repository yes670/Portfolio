import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs'); // 'projects' or 'blogs'
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // 博客表单状态
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [editingBlogId, setEditingBlogId] = useState(null);

  // 项目表单状态
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTech, setProjectTech] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'https://capstone-api-yes670.onrender.com/api';
  const token = localStorage.getItem('token');

  // 获取数据
  const fetchData = () => {
    fetch(`${API_BASE}/blogs`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setBlogs(data))
      .catch(() => {});

    fetch(`${API_BASE}/projects`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setProjects(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1. 删除博客 (带 Token 鉴权)
  const handleDeleteBlog = async (id) => {
    if (!window.confirm('确定要删除这篇技术博客吗？')) return;
    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setMessage('✓ 博客删除成功！');
        fetchData();
      } else {
        alert('删除失败：权限不足或会话已过期');
      }
    } catch {
      alert('网络请求失败，请稍后重试');
    }
  };

  // 2. 提交/修改博客 (带 Token 鉴权)
  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const url = editingBlogId ? `${API_BASE}/blogs/${editingBlogId}` : `${API_BASE}/blogs`;
    const method = editingBlogId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: blogTitle, content: blogContent }),
      });

      if (res.ok) {
        setMessage(editingBlogId ? '✓ 博客修改成功！' : '✓ 博客发布成功！');
        setBlogTitle('');
        setBlogContent('');
        setEditingBlogId(null);
        fetchData();
      } else {
        setMessage('操作失败，请检查填写内容');
      }
    } catch {
      setMessage('网络请求失败');
    } finally {
      setLoading(false);
    }
  };

  // 3. 删除项目 (带 Token 鉴权)
  const handleDeleteProject = async (id) => {
    if (!window.confirm('确定要删除这个项目吗？')) return;
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setMessage('✓ 项目删除成功！');
        fetchData();
      } else {
        alert('删除失败：权限不足或会话已过期');
      }
    } catch {
      alert('网络请求失败，请稍后重试');
    }
  };

  // 4. 提交/修改项目 (带 Token 鉴权)
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const url = editingProjectId ? `${API_BASE}/projects/${editingProjectId}` : `${API_BASE}/projects`;
    const method = editingProjectId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: projectTitle,
          description: projectDesc,
          technologies: projectTech.split(',').map((t) => t.trim()),
        }),
      });

      if (res.ok) {
        setMessage(editingProjectId ? '✓ 项目修改成功！' : '✓ 项目发布成功！');
        setProjectTitle('');
        setProjectDesc('');
        setProjectTech('');
        setEditingProjectId(null);
        fetchData();
      } else {
        setMessage('操作失败，请检查填写内容');
      }
    } catch {
      setMessage('网络请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-gray-100">
      {/* 顶部标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
            系统管理控制台
          </h1>
          <p className="text-gray-400 text-sm mt-1">管理前台展示的工程项目与技术博客资产（支持动态发布与实时增删改）</p>
        </div>

        {/* Tab 切换 */}
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'blogs' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            文章管理 ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'projects' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            项目管理 ({projects.length})
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 mb-6 text-sm rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300">
          {message}
        </div>
      )}

      {/* 模块一：博客管理 */}
      {activeTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧表单 */}
          <div className="lg:col-span-1 bg-gray-800/40 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-lg font-bold mb-4">
              {editingBlogId ? '编辑博客文章' : '发布新技术文章'}
            </h2>
            <form onSubmit={handleSubmitBlog} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">文章标题</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="如：React 18 架构深度解析"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">文章内容</label>
                <textarea
                  rows="6"
                  required
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="支持输入正文内容..."
                ></textarea>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition"
                >
                  {editingBlogId ? '保存修改' : '确认发布'}
                </button>
                {editingBlogId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlogId(null);
                      setBlogTitle('');
                      setBlogContent('');
                    }}
                    className="px-3 py-2 rounded-lg bg-gray-700 text-sm text-gray-300"
                  >
                    取消
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 右侧列表 */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-lg font-bold mb-4">已发布文章列表</h2>
            {blogs.length === 0 ? (
              <p className="text-sm text-gray-500">暂无数据</p>
            ) : (
              blogs.map((b) => (
                <div
                  key={b._id}
                  className="p-4 rounded-xl bg-gray-800/30 border border-gray-800 flex items-center justify-between hover:border-gray-700 transition"
                >
                  <div>
                    <h3 className="font-semibold text-white text-sm">{b.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-1">{b.content}</p>
                  </div>
                  <div className="flex space-x-2 shrink-0 ml-4">
                    <button
                      onClick={() => {
                        setEditingBlogId(b._id);
                        setBlogTitle(b.title);
                        setBlogContent(b.content);
                      }}
                      className="text-xs px-3 py-1.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 transition"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b._id)}
                      className="text-xs px-3 py-1.5 rounded bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 模块二：项目管理 */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧表单 */}
          <div className="lg:col-span-1 bg-gray-800/40 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-lg font-bold mb-4">
              {editingProjectId ? '编辑工程项目' : '添加新项目'}
            </h2>
            <form onSubmit={handleSubmitProject} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">项目名称</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="如：MERN 全栈内容系统"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">项目简介</label>
                <textarea
                  rows="4"
                  required
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="简述系统核心功能..."
                ></textarea>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">技术栈（英文逗号隔开）</label>
                <input
                  type="text"
                  value={projectTech}
                  onChange={(e) => setProjectTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition"
                >
                  {editingProjectId ? '保存修改' : '确认添加'}
                </button>
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectTitle('');
                      setProjectDesc('');
                      setProjectTech('');
                    }}
                    className="px-3 py-2 rounded-lg bg-gray-700 text-sm text-gray-300"
                  >
                    取消
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 右侧列表 */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-lg font-bold mb-4">已上架项目列表</h2>
            {projects.length === 0 ? (
              <p className="text-sm text-gray-500">暂无数据</p>
            ) : (
              projects.map((p) => (
                <div
                  key={p._id}
                  className="p-4 rounded-xl bg-gray-800/30 border border-gray-800 flex items-center justify-between hover:border-gray-700 transition"
                >
                  <div>
                    <h3 className="font-semibold text-white text-sm">{p.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-1">{p.description}</p>
                  </div>
                  <div className="flex space-x-2 shrink-0 ml-4">
                    <button
                      onClick={() => {
                        setEditingProjectId(p._id);
                        setProjectTitle(p.title);
                        setProjectDesc(p.description);
                        setProjectTech((p.technologies || []).join(', '));
                      }}
                      className="text-xs px-3 py-1.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 transition"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p._id)}
                      className="text-xs px-3 py-1.5 rounded bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
