# Smart Lead - AI Agent

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Project Overview

This project, "Smart Lead - AI Agent", is designed to streamline B2B lead generation and sales outreach through the power of AI. It aims to automate prospect identification, personalize email communication, and provide valuable insights for sales teams.

## Key Features
- Intelligent prospect search based on industry, company size, and role criteria
- AI-generated company and contact information
- Automated email draft generation
- Real-time prospect qualification

## Tech Stack
- Frontend: React 18.3 with TypeScript
- UI Framework: Tailwind CSS
- Icons: Lucide React
- Build Tool: Vite
- Package Manager: npm

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (>= 18.0.0)
*   npm (>= 9.0.0)
*   Git

### Clone the repository

```bash
git clone <repository_url>
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Configure environment variables by copying the example file:

```bash
cp .env.example .env
```

Then, update the `.env` file with your API URL and key:

```
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_KEY=your_api_key
```

## Usage

### Start the frontend development server

```bash
npm run dev
```

This will start the frontend development server.

## Backend Setup and Usage

The backend is a Node.js application located in the `backend` directory.

### Environment Variables

In addition to the frontend environment variables, the backend requires an OpenAI API key. Update the `.env` file with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key
```

### Start the backend server

Navigate to the `backend` directory and run the start script:

```bash
cd backend
npm start
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

X, LinkedIn or Email.
