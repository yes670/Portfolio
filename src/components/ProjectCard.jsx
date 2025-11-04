// src/components/ProjectCard.jsx
import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img 
        src={project.imageUrl || 'https://via.placeholder.com/400x250?text=Project+Image'} 
        alt={project.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 h-24 overflow-auto">{project.description}</p>
        <div className="flex justify-end space-x-4 mt-4">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 font-semibold">Live Demo</a>}
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 font-semibold">Repository</a>}
        </div>
      </div>
    </div>
  );
}