import { useRef, useEffect, useState } from "react";
import { ExternalLink, Github, Eye, Code, Zap, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "3D Attention Mechanism Visualizer",
      description: "Interactive 3D visualization of how Query, Key, and Value matrices interact in neural attention mechanisms. Built with React Three Fiber and educational UI components.",
      image: "/api/placeholder/400/250",
      category: "3d-viz",
      technologies: ["React", "Three.js", "TypeScript", "WebGL", "AI/ML"],
      liveDemo: "/attention-game",
      github: "https://github.com/jafetmorales/attention-viz",
      featured: true,
      icon: <Brain size={24} />
    },
    {
      title: "Attention Head Lab",
      description: "Interactive educational game teaching how attention mechanisms work through hands-on puzzles. Players learn Q·K computation, softmax normalization, and weighted value mixing through progressive levels.",
      image: "/api/placeholder/400/250", 
      category: "ai",
      technologies: ["React", "TypeScript", "Framer Motion", "Recharts", "Educational"],
      liveDemo: "/attention-head-lab",
      github: "https://github.com/jafetmorales/attention-head-lab",
      featured: true,
      icon: <Brain size={24} />
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Supports multiple vendors and complex product catalogs.",
      image: "/api/placeholder/400/250",
      category: "fullstack",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      liveDemo: "https://ecommerce-demo.jafetmorales.com",
      github: "https://github.com/jafetmorales/ecommerce-platform",
      featured: true,
      icon: <Code size={24} />
    },
    {
      title: "Real-Time Collaboration Tool",
      description: "Multi-user collaborative workspace with real-time editing, video calls, and project management features. Built for remote teams and creative professionals.",
      image: "/api/placeholder/400/250",
      category: "webapp",
      technologies: ["React", "Socket.io", "MongoDB", "WebRTC", "Redis"],
      liveDemo: "https://collab-tool.jafetmorales.com",
      github: "https://github.com/jafetmorales/collab-tool",
      featured: false,
      icon: <Zap size={24} />
    },
    {
      title: "AI-Powered Content Generator",
      description: "Content creation platform using advanced AI models for generating blog posts, social media content, and marketing copy. Features custom templates and brand voice training.",
      image: "/api/placeholder/400/250",
      category: "ai",
      technologies: ["Python", "OpenAI API", "FastAPI", "React", "TensorFlow"],
      liveDemo: "https://ai-content.jafetmorales.com",
      github: "https://github.com/jafetmorales/ai-content-gen",
      featured: false,
      icon: <Brain size={24} />
    },
    {
      title: "Smart Home Dashboard",
      description: "IoT dashboard for managing smart home devices with real-time monitoring, automation rules, and energy consumption analytics. Mobile-responsive design.",
      image: "/api/placeholder/400/250",
      category: "iot",
      technologies: ["Vue.js", "Node.js", "MQTT", "InfluxDB", "Docker"],
      liveDemo: "https://smarthome.jafetmorales.com",
      github: "https://github.com/jafetmorales/smart-home",
      featured: false,
      icon: <Zap size={24} />
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website with dark mode, smooth animations, and 3D elements. Built with React and Three.js for interactive experiences.",
      image: "/api/placeholder/400/250",
      category: "frontend",
      technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
      liveDemo: "/",
      github: "https://github.com/jafetmorales/portfolio",
      featured: false,
      icon: <Code size={24} />
    }
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "3d-viz", label: "3D & Visualization" },
    { id: "ai", label: "AI & ML" },
    { id: "webapp", label: "Web Apps" },
    { id: "iot", label: "IoT" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Highlighted Work</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl hover:scale-105 ${
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-6xl opacity-20">
                        {project.icon}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        {project.liveDemo && (
                          project.liveDemo.startsWith('/') ? (
                            <Link
                              to={project.liveDemo}
                              className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                              title="View Live Demo"
                            >
                              <Eye size={20} />
                            </Link>
                          ) : (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                              title="View Live Demo"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                          title="View Source Code"
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === category.id
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl hover:scale-105 ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <div className="text-white text-4xl opacity-30">
                      {project.icon}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      {project.liveDemo && (
                        project.liveDemo.startsWith('/') ? (
                          <Link
                            to={project.liveDemo}
                            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="View Live Demo"
                          >
                            <Eye size={16} />
                          </Link>
                        ) : (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="View Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="View Source Code"
                      >
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                    {project.description.length > 100 
                      ? `${project.description.substring(0, 100)}...` 
                      : project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}