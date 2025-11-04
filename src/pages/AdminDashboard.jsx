// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ProjectForm from '../components/ProjectForm';
import BlogForm from '../components/BlogForm';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [view, setView] = useState('projects');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [projectsRes, blogsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/projects`),
        axios.get(`${import.meta.env.VITE_API_URL}/blog`),
      ]);
      setProjects(projectsRes.data);
      setBlogs(blogsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this? This action cannot be undone.')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/${type}/${id}`);
        fetchData();
      } catch (err) {
        alert('Deletion failed!');
        console.error(err);
      }
    }
  };

  const handleEdit = (type, item) => {
    setEditingItem({ type, data: item });
  };
  
  const handleFormSuccess = () => {
      setEditingItem(null);
      fetchData();
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6 border-b">
        <button onClick={() => { setView('projects'); setEditingItem(null); }} className={`py-2 px-4 text-lg ${view === 'projects' ? 'border-b-2 border-cyan-500 text-cyan-500' : 'text-gray-500'}`}>Manage Projects</button>
        <button onClick={() => { setView('blogs'); setEditingItem(null); }} className={`py-2 px-4 text-lg ${view === 'blogs' ? 'border-b-2 border-cyan-500 text-cyan-500' : 'text-gray-500'}`}>Manage Blogs</button>
      </div>

      <div className="mb-8">
        {(!editingItem || editingItem.type !== (view === 'projects' ? 'project' : 'blog')) && (
            <button onClick={() => setEditingItem({ type: (view === 'projects' ? 'project' : 'blog'), data: null })} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              {view === 'projects' ? '+ Create New Project' : '+ Create New Blog'}
            </button>
        )}
        
        {editingItem && editingItem.type === 'project' && view === 'projects' && (
            <ProjectForm project={editingItem.data} onSuccess={handleFormSuccess} onCancel={() => setEditingItem(null)} />
        )}
        {editingItem && editingItem.type === 'blog' && view === 'blogs' && (
            <BlogForm post={editingItem.data} onSuccess={handleFormSuccess} onCancel={() => setEditingItem(null)} />
        )}
      </div>

      {view === 'projects' ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Projects List ({projects.length})</h2>
           <div className="space-y-4">
            {projects.map(p => (
              <div key={p._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow-md flex justify-between items-center">
                <span className="font-semibold">{p.title}</span>
                <div className="space-x-2">
                  <button onClick={() => handleEdit('project', p)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded">Edit</button>
                  <button onClick={() => handleDelete('projects', p._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Blogs List ({blogs.length})</h2>
          <div className="space-y-4">
            {blogs.map(b => (
              <div key={b._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow-md flex justify-between items-center">
                <span className="font-semibold">{b.title}</span>
                <div className="space-x-2">
                  <button onClick={() => handleEdit('blog', b)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded">Edit</button>
                  <button onClick={() => handleDelete('blog', b._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}