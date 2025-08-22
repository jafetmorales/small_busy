# Overview

This is a comprehensive portfolio website for Jafet Morales featuring educational games that visualize how attention mechanisms work in Large Language Models (LLMs). The portfolio includes both a professional showcase and interactive educational experiences:

1. **Professional Portfolio**: Modern responsive website with hero section, about, skills, experience timeline, projects showcase, and contact form
2. **3D Attention Visualizer**: Interactive 3D visualization of Query, Key, and Value matrix operations using React Three Fiber
3. **Attention Head Lab**: Progressive educational game with 3 levels teaching Q·K computation, softmax normalization, and weighted value mixing through hands-on puzzles

Built with React, TypeScript, Three.js, and Express, featuring immersive graphics, interactive learning components, and professional design to help users understand fundamental AI concepts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React + TypeScript**: Main frontend framework with full type safety
- **Three.js Integration**: Uses @react-three/fiber and @react-three/drei for 3D rendering and scene management
- **Component-based Design**: Modular architecture with specialized components for matrix visualization, educational UI, and game controls
- **State Management**: Zustand stores for attention mechanism state, audio controls, and game phases
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system

## Backend Architecture
- **Express.js Server**: RESTful API server with middleware for request logging and error handling
- **TypeScript**: Full type safety across server-side code
- **Modular Route System**: Centralized route registration with separation of concerns
- **Development Tools**: Vite integration for hot module replacement and development experience

## Data Storage Solutions
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Database Schema**: User management system with username/password authentication
- **Memory Storage**: In-memory storage implementation for development with interface for easy database switching
- **Migration System**: Automated database schema management through Drizzle Kit

## Educational System Design
- **3D Attention Visualizer**: Interactive 3D matrices with clickable cells, visual feedback, and step-by-step attention process walkthrough
- **Attention Head Lab**: Progressive puzzle-based learning with 3 levels:
  - Level 1: Find best-matching Key (Q·K dot product computation)
  - Level 2: Tune softmax distribution with interactive sliders
  - Level 3: Compute weighted value mixing (Σ pᵢ Vᵢ)
- **Real-time Visualizations**: Bar charts, attention diagrams, and chord visualizations showing probability distributions
- **Interactive Learning**: Hands-on puzzles, scoring system, streak tracking, and immediate feedback
- **Audio Feedback**: Sound system for user interactions and progress indication

## 3D Visualization Architecture
- **Matrix Rendering**: 3D representation of matrices with color-coded values and interactive cells
- **Animation System**: Smooth transitions between learning steps with visual effects
- **Camera Controls**: Keyboard-based navigation for exploring the 3D scene
- **Shader Support**: GLSL shader integration for advanced visual effects

## External Dependencies

- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **Three.js Ecosystem**: @react-three/fiber, @react-three/drei, @react-three/postprocessing for 3D graphics
- **Radix UI**: Comprehensive component library for accessible UI elements
- **Drizzle**: Modern ORM with type-safe database operations and migration management
- **Zustand**: Lightweight state management for React applications
- **Vite**: Build tool and development server with hot module replacement
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Animation library for smooth transitions and interactive elements
- **Recharts**: Charting library for data visualization in educational components
- **React Router**: Client-side routing for navigation between portfolio and educational games