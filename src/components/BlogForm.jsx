

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialFormState = { title: '', content: '' };

export default function BlogForm({ post, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);
  const isEditing = !!post;

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
       
      });
    } else {
      setFormData(initialFormState);
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/blog/${post._id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/blog`, formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save post', error);
      alert('Failed to save post!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Post Title" required className="mt-1 w-full p-2 rounded dark:bg-gray-800 border border-gray-300 dark:border-gray-600" />
        </div>

        {/* --- Summary 输入框和标签已被完全删除 --- */}

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange} placeholder="Write your post content here. Markdown is supported." required className="mt-1 w-full p-2 rounded dark:bg-gray-800 border border-gray-300 dark:border-gray-600" rows="10"></textarea>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Cancel</button>
        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded">Save</button>
      </div>
    </form>
  );
}