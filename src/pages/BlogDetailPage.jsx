// src/pages/BlogDetailPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BlogDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`);
      setPost(response.data);
    } catch (err) {
      setError('Failed to load the blog post.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/blog/${id}/comments`, { content: comment });
      setComment('');
      fetchPost();
    } catch (err) {
      console.error('Failed to post comment', err);
      alert('Failed to post comment. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Published on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <div className="space-y-4 mb-8">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c) => (
              <div key={c._id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="font-semibold">{c.author?.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{new Date(c.createdAt).toLocaleString('en-US')}</p>
                <p>{c.content}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>

        {token ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment..."
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
              required
            ></textarea>
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit Comment
            </button>
          </form>
        ) : (
          <p>Please <Link to="/login" className="text-cyan-500 hover:underline">login</Link> to post a comment.</p>
        )}
      </section>
    </article>
  );
}