// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <img
          src="https://github.com/yes670.png" // Replace this with your own avatar image link
          alt="Avatar"
          className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-cyan-400 shadow-lg"
        />
        <h1 className="text-5xl font-extrabold mb-4">
          Hi, I'm <span className="text-cyan-400">Ye Sheng</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          A Front-end Developer / Full-Stack Engineer / UI/UX Enthusiast
        </p>
        <div className="prose dark:prose-invert lg:prose-xl mx-auto text-left">
            <p>
                Welcome to my personal portfolio. I am passionate about building beautiful and functional web applications using modern technologies. 
                I specialize in tech stacks like React, Node.js, and Tailwind CSS, and I'm always learning and exploring new things.
            </p>
            <p>
                Here you can browse some of my past <Link to="/projects" className="text-cyan-500 hover:underline">projects</Link>, 
                and read my technical thoughts and learning notes on my <Link to="/blog" className="text-cyan-500 hover:underline">blog</Link>. 
                If you are interested in me or my work, feel free to get in touch through the <Link to="/contact" className="text-cyan-500 hover:underline">contact page</Link>.
            </p>
        </div>
        <div className="mt-12">
            <Link 
                to="/projects"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
            >
                View My Projects
            </Link>
        </div>
      </div>
    </div>
  );
}