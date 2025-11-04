// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);

        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.warn('API did not return an array for projects.');
          setProjects([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects to display yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}