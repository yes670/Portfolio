# Full-Stack Personal Portfolio Website

This is a comprehensive full-stack project built for the "Web Programming – Building the Modern User Interface" course. The front-end is developed with **React (using Vite)** and styled with **Tailwind CSS**. It serves as the client-side application for a back-end API built with Node.js, Express, and MongoDB.

## Live Demo & API Links

*   **Live Frontend URL**: `[
    在这里粘贴你部署后从 Vercel 获得的最终网址
    ]`
*   **Live Backend API URL**: `https://capstone-api-yes670.onrender.com`

## Core Features Implemented

This project successfully implements all the core requirements of the capstone project:

-   **Component-Based Architecture**: The UI is built with logical, reusable React components (`Header`, `ProjectCard`, `AdminDashboard`, etc.).
-   **Client-Side Routing**: Utilizes `React Router` to create a seamless multi-page user experience, including protected routes for administration.
-   **Full Authentication Flow**: Implements user registration, login, and logout. JWTs (JSON Web Tokens) are used for managing authentication state.
-   **Global State Management**: The `Context API` is used to manage global authentication state, making user data and auth functions available throughout the application.
-   **Full-Stack CRUD Operations**:
    -   **Read**: Fetches and displays project and blog data from the live backend API.
    -   **Create, Update, Delete**: Provides a secure admin dashboard where authenticated users can create, update, and delete portfolio projects and blog posts.
-   **API Integration**: The React app consumes all endpoints of the portfolio API, including fetching public data and performing authenticated actions.
-   **Responsive & Modern Design**: Styled with Tailwind CSS to ensure a professional and responsive layout that works on all screen sizes.

## Local Development Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yes670/Portfolio.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Portfolio
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create an environment file:**
    *   Create a `.env` file in the root of the project.
    *   Add the following line to the `.env` file, connecting it to the live backend API:
        ```
        VITE_API_URL=https://capstone-api-yes670.onrender.com/api
        ```

5.  **Start the local development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.
