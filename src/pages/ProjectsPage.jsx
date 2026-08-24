import React, { useState, useEffect } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 兜底静态数据（防止后端休眠时空白）
  const defaultProjects = [
    {
      _id: '1',
      title: '基于 MERN 架构的高可用数字内容管理系统',
      description: '采用前后端分离架构，实现 JWT 无状态认证、路由鉴权保护及多云自动化 CI/CD 部署。',
      technologies: ['React 18', 'Node.js', 'Express', 'MongoDB Atlas', 'Tailwind CSS'],
    },
    {
      _id: '2',
      title: '高并发分布式 Web 架构优化实践',
      description: '利用静态生成（SSG）、代码分割懒加载及边缘 CDN 缓存，将首屏加载耗时缩减 40% 以上。',
      technologies: ['Vite', 'React Router', 'Vercel Edge', 'REST API'],
    },
  ];

  useEffect(() => {
    fetch('https://capstone-api-yes670.onrender.com/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
        else setProjects(defaultProjects);
      })
      .catch(() => setProjects(defaultProjects))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">工程实践与项目库</h1>
        <p className="text-gray-400">展示在全栈开发、系统架构以及前端工程化方向的核心成果</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/60 hover:border-blue-500/50 transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-white mb-3">{project.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded bg-blue-950/70 border border-blue-800/40 text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
