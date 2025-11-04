// src/components/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormState = { title: '', description: '', imageUrl: '', liveUrl: '', repoUrl: '' };

export default function ProjectForm({ project, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);
  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        imageUrl: project.imageUrl || '',
        liveUrl: project.liveUrl || '',
        repoUrl: project.repoUrl || '',
      });
    } else {
        setFormData(initialFormState);
    }
  }, [project]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/projects/${project._id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save project', error);
      alert('Failed to save project!');
    }
  };

return (
    <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Create New Project'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        
        {/* --- Title Field --- */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" required className="mt-1 w-full p-2 rounded dark:bg-gray-800 border border-gray-300 dark:border-gray-600" />
        </div>

        {/* --- Image URL Field --- */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
          <input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="mt-1 w-full p-2 rounded dark:bg-gray-800 border border-gray-300 dark:border-gray-600" />
        </div>

        {/* --- Live URL Field --- */}
        <div>
          <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Live Demo URL</label>
          <input id="liveUrl" name="liveUrl" value={formData.liveUrl} onChange={handleChange} placeholder="https://..." className="mt-1 w-full p-2 rounded dark:bg-gray-800 border border-gray-300 dark:border-gray-600" />
        </div>
        
        {/* --- Repo URL Field --- */}
        <div className="md:col-span-2">
            <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Code Repository URL</label>
            <input id="repoUrl" name="repoUrl" value={formData.repoUrl} onChange={handleChange} placeholder="https://github.com/..." className="mt-1 w-full p-2 rounded dark:bg-gray-800 border border-gray-300 dark:border-gray-600" />
        </div>

        {/* --- Description Field --- */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="A short description of the project" required className="mt-1 w-full p-2 rounded dark:bg-gray-800 border border-gray-300 dark:border-gray-600" rows="4"></textarea>
        </div>

      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Cancel</button>
        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded">Save</button>
      </div>
    </form>
  );
}