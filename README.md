# Real-Time Analytics Dashboard

A modern, production-ready **React-based dashboard** built using the latest frontend technologies. This application provides real-time insights via dynamic charts, responsive design, and smooth interactions—ideal for SaaS platforms or data-intensive admin panels.

## Features

* **React 18** — Leveraging concurrent rendering for optimized performance
* **Vite** — Blazing-fast development and build setup
* **Redux Toolkit** — Simplified global state management
* **Tailwind CSS** — Utility-first styling framework with full customization
* **React Router v6** — Declarative client-side routing
* **D3.js & Recharts** — Robust and flexible data visualization tools
* **React Hook Form** — Lightweight and scalable form management
* **Framer Motion** — Smooth and performant UI animations
* **Jest + React Testing Library** — Unit and integration testing ready

## Prerequisites

Make sure you have the following installed:

* **Node.js** (v14 or higher)
* **npm** or **yarn**

## Installation & Development

1. Clone the repository and navigate into the project:

   ```bash
   git clone https://github.com/cobrianz/ACTITO-Realtime-dashboad.git
   cd react-dashboard
   ```

2. Install project dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
react-dashboard/
├── public/              # Static assets and favicon
├── src/
│   ├── components/      # Reusable UI elements
│   ├── pages/           # Main page views
│   ├── styles/          # Tailwind and global CSS
│   ├── App.jsx          # Main app layout
│   ├── Routes.jsx       # All route definitions
│   └── index.jsx        # Application entry point
├── .env                 # Environment-specific variables
├── index.html           # Root HTML template
├── package.json         # Project metadata and scripts
├── tailwind.config.js   # Tailwind CSS custom config
└── vite.config.js       # Vite bundler configuration
```

## Adding Routes

To define new routes, modify `Routes.jsx`:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more pages here
  ]);

  return routes;
};
```

## Styling with Tailwind CSS

Includes support for:

* `@tailwind/forms` for form styling
* `@tailwind/typography` for content-rich layouts
* `@tailwind/aspect-ratio` for responsive media
* Container queries for responsive layout components
* Fluid typography for scalable text
* Utility classes for animation and transitions

## Responsive Design

Built mobile-first using Tailwind’s breakpoint system. Layout and components adapt seamlessly across devices.

## Deployment

To generate a production-ready build:

```bash
npm run build
```

Deploy the `dist/` folder to your preferred hosting platform (e.g., Vercel, Netlify, Firebase Hosting).

## Acknowledgments

This project is powered by:

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [D3.js](https://d3js.org/) & [Recharts](https://recharts.org/)
* [Framer Motion](https://www.framer.com/motion/)
