# 🚀 基于 MERN 架构的高可用数字内容管理与展示系统

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Deployment](https://img.shields.io/badge/部署平台-Vercel%20%7C%20Render-black)

基于 **MERN（MongoDB + Express + React + Node.js）** 技术栈构建的现代化全栈内容管理与数字化作品展示平台。项目采用前后端完全解耦架构，具备完整的 JWT 安全认证、后台数据动态管理（CRUD）、多端响应式适配及自动化云原生持续部署（CI/CD）。

---

## 🌐 线上访问与演示

- **前端展示端（Vercel CDN 全球分发）**: [https://portfolio-ye-shengs-projects.vercel.app](https://portfolio-ye-shengs-projects.vercel.app)
- **后端 API 服务（Render 云托管）**: [https://capstone-api-yes670.onrender.com](https://capstone-api-yes670.onrender.com)

---

## 🏗️ 系统架构设计

```text
[ 前端客户端：React 18 + Vite + Tailwind CSS ] 
                     │
                     │ (HTTPS / RESTful API)
                     ▼
[ 后端 API 服务：Node.js + Express 中间件 ] ─── [ JWT 无状态身份认证 ]
                     │
                     │ (Mongoose ODM 数据建模)
                     ▼
[ 云端数据库：MongoDB Atlas 分布式集群 ]

---

##  🌟 核心技术亮点

1. **现代化组件驱动与 SPA 架构**
   - 前端基于 **React 18 + Vite** 构建，采用模块化与组件化设计思想，极大提升代码复用率。
   - 采用 **React Router** 实现单页客户端路由导航，结合按需加载机制优化首屏渲染性能。

2. **安全鉴权与状态共享**
   - 采用 **JWT（JSON Web Token）** 实现无状态登录认证与会话管理。
   - 使用 **Context API** 管理全局用户认证状态，封装 **受保护路由（Protected Routes）**，严格限制未授权访问后台管理控制台。

3. **完整的数据动态管理（CRUD）**
   - 支持项目作品与技术文章的创建、异步检索、修改及删除全流程管理。
   - 前后端数据实时同步，提供即时状态反馈与优雅的交互体验。

4. **跨端自适应与多云自动化部署**
   - 结合 **Tailwind CSS** 栅格系统，实现移动端、平板与 PC 桌面端的 100% 响应式布局自适应。
   - 前端通过 **Vercel** 实现 Git 提交触发的自动化构建与边缘 CDN 极速加速；后端微服务容器化托管于 **Render**，数据库直连 **MongoDB Atlas**。

## 🛠️ 本地运行指南

# 1. 克隆代码仓库到本地
git clone https://github.com/yes670/Portfolio.git
cd Portfolio

# 2. 安装项目依赖
npm install

# 3. 配置环境变量 (.env)
echo "VITE_API_URL=https://capstone-api-yes670.onrender.com/api" > .env

# 4. 启动本地前端开发服务
npm run dev

