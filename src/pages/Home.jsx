import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 默认精选项目（当后端在休眠时立即展示，防止一直转圈白屏）
  const fallbackProjects = [
    {
      _id: '1',
      title: 'MERN 数字资产与内容管理系统',
      description: '基于 React 18、Node.js 与 MongoDB 的现代化全栈管理平台，集成 JWT 鉴权与自动化 CI/CD。',
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      link: '/projects',
    },
    {
      _id: '2',
      title: '分布式高可用 Web 服务架构',
      description: '采用前后端完全解耦设计，前端边缘 CDN 加速分发，后端容器化托管与无状态微服务集群。',
      technologies: ['Vite', 'Express', 'Vercel', 'Render'],
      link: '/projects',
    },
  ];

  useEffect(() => {
    // 异步拉取后端动态数据（支持 3 秒超时自动回退，彻底解决转圈卡死）
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    fetch('https://capstone-api-yes670.onrender.com/api/projects', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.slice(0, 3));
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch(() => {
        setProjects(fallbackProjects);
      })
      .finally(() => {
        setLoading(false);
        clearTimeout(timeoutId);
      });
  }, []);

  return (
    <div className="min-h-screen text-gray-100">
      {/* 🌟 1. Hero 封面区域（科技感渐变背景） */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* 背景光晕装饰 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Full-Stack Software Engineer & Researcher
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            构建高性能、现代化的 <br />
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              全栈 Web 系统与数字化架构
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            专注于现代前端工程化、RESTful 高可用微服务以及云原生架构设计。致力于用严谨的工程思维交付优雅高效的软件系统。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/25 transition duration-200"
            >
              浏览工程项目 →
            </Link>
            <Link
              to="/blog"
              className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium border border-gray-700 transition duration-200"
            >
              技术博客与思考
            </Link>
          </div>
        </div>
      </section>

      {/* 🛠️ 2. 核心技术栈徽章区 */}
      <section className="py-12 border-y border-gray-800/80 bg-gray-900/40">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6">
            Core Technology Stack & Ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {['React 18', 'Node.js', 'Express', 'MongoDB Atlas', 'Vite', 'Tailwind CSS', 'JWT Auth', 'Vercel / Render CI/CD'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700/60 text-sm text-gray-300 font-medium hover:border-blue-500/40 hover:text-blue-400 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 💻 3. 精选项目展示区 */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">精选工程实践</h2>
            <p className="text-gray-400 text-sm mt-1">展示具备实际业务价值与前后端闭环的全栈项目</p>
          </div>
          <Link to="/projects" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            查看全部项目 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(projects.length > 0 ? projects : fallbackProjects).map((item) => (
            <div
              key={item._id}
              className="group p-6 rounded-2xl bg-gray-800/40 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/60 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(item.technologies || ['Full-Stack', 'Web']).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded bg-blue-950/60 border border-blue-800/40 text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to="/projects"
                  className="inline-flex items-center text-xs font-semibold text-gray-300 hover:text-white"
                >
                  探索详情 <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
