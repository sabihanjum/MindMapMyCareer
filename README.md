# MindMapMyCareer: Your AI Career Navigator

MindMapMyCareer is a Next.js web application designed to help students and professionals explore personalized career pathways using the power of AI. It provides tailored recommendations, an interactive AI chatbot for career advice, and quizzes to test knowledge.

## Features

- **AI-Powered Pathway Generation**: Enter your skills, interests, and aspirations to receive a curated list of potential career paths and recommended skills to develop.
- **AI Career Advisor Chatbot**: Ask career-related questions and get instant, helpful answers from an AI-powered chatbot.
- **Interactive Quizzes**: Test your knowledge on various topics (like Software Development) with AI-generated quizzes.
- **Gamified Dashboard**: Track your progress with levels, points, and a leaderboard to see how you stack up against your peers.
- **Modern, Responsive UI**: Built with ShadCN UI and Tailwind CSS for a clean and responsive user experience on any device.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI/Generative**: [Google's Gemini model](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/) or a compatible package manager

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-repo/mindmapmycareer.git
cd mindmapmycareer
npm install
```

### 2. Environment Setup

This project uses Google's Gemini API for its AI features. You'll need to get an API key and set it up.

1.  Create a `.env` file in the root of the project by copying the example:
    ```bash
    cp .env.example .env
    ```
2.  Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add your API key to the `.env` file:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### 3. Running the Application

This project consists of two main parts that need to run concurrently in development: the Next.js frontend and the Genkit AI flows.

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    This will start the frontend on [http://localhost:9002](http://localhost:9002).

2.  **In a separate terminal, start the Genkit development server:**
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit flows and provides a UI to inspect them, typically on [http://localhost:4000](http://localhost:4000).

## Available Scripts

- `npm run dev`: Runs the Next.js application in development mode with Turbopack.
- `npm run genkit:dev`: Starts the Genkit development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the project files using Next.js's built-in ESLint configuration.

## Deployment

This project is configured for deployment on [Netlify](https://www.netlify.com/). The `netlify.toml` file contains the necessary build commands and plugin configurations. Simply link your repository to a new site in Netlify to deploy.
