
# Task Manager

A React-based task management app built with Vite and Tailwind CSS, deployed on Vercel.

## Tech Stack

- **React** — UI library
- **Vite** — Build tool with HMR
- **React Hook Form** — Form handling and validation
- **Tailwind CSS** — Styling
- **ESLint** — Code linting

## Project Structure

```
Task-manager/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddTask.jsx       # Form to add a new task
│   │   ├── TaskCount.jsx     # Displays task count
│   │   ├── TaskList.jsx      # Renders list of tasks
│   │   └── TaskManager.jsx   # Main container component
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

- Add new tasks via a validated form
- View total task count
- List all tasks
- Clean, responsive UI with Tailwind CSS

## Deployment on Vercel

This app is deployed on https://week7-react-handson2.vercel.app/ [Vercel]

### Steps to Deploy

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. Vercel auto-detects Vite — no extra config needed.
4. Click **Deploy**.

Vercel auto-deploys on every push to the `main` branch.
