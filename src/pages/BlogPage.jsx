// src/pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8">My Blog</h1>
      {posts.length === 0 ? (
         <p className="text-center text-gray-500">No blog posts yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.map(post => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}