import { useRef, useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
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

  const experiences = [
    {
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description: "Leading development of next-generation web applications using React, Node.js, and cloud technologies.",
      achievements: [
        "Architected and built a real-time collaboration platform serving 100k+ users",
        "Reduced application load time by 60% through performance optimization",
        "Mentored a team of 5 junior developers and established best practices",
        "Implemented CI/CD pipelines reducing deployment time by 80%"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Redis"]
    },
    {
      company: "Innovative Startups Inc",
      position: "Full Stack Developer",
      period: "2020 - 2022",
      location: "Austin, TX",
      description: "Developed cutting-edge applications for various startups, focusing on rapid prototyping and MVP development.",
      achievements: [
        "Built 8 MVPs from concept to production in under 6 months each",
        "Integrated AI/ML capabilities into web applications using Python and TensorFlow",
        "Designed and implemented RESTful APIs serving millions of requests daily",
        "Collaborated with designers to create pixel-perfect, responsive interfaces"
      ],
      technologies: ["React", "Python", "Django", "MongoDB", "Docker", "GCP"]
    },
    {
      company: "Digital Agency Pro",
      position: "Frontend Developer",
      period: "2019 - 2020",
      location: "Remote",
      description: "Specialized in creating beautiful, responsive websites and web applications for clients across various industries.",
      achievements: [
        "Delivered 25+ client projects with 98% satisfaction rate",
        "Implemented modern design systems using Tailwind CSS and Styled Components",
        "Optimized websites for SEO achieving 40% improvement in search rankings",
        "Created reusable component libraries reducing development time by 50%"
      ],
      technologies: ["React", "Vue.js", "Sass", "WordPress", "PHP", "MySQL"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2015 - 2019",
      location: "California, USA",
      achievements: [
        "Graduated Magna Cum Laude with 3.8 GPA",
        "President of Computer Science Club",
        "Winner of University Hackathon 2018"
      ]
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Experience & Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A journey of continuous learning and professional growth in the tech industry.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Briefcase className="mr-3 text-blue-600" size={28} />
              Professional Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-700 hover:shadow-xl ${
                    isVisible 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.position}
                      </h4>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                      <div className="flex items-center mb-1">
                        <Calendar size={16} className="mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exp.description}
                  </p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start text-gray-600 dark:text-gray-300">
                          <ChevronRight size={16} className="mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <svg className="mr-3 text-blue-600" width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              Education
            </h3>
            
            {education.map((edu, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-700 ${
                  isVisible 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {edu.school}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                    <div className="flex items-center mb-1">
                      <Calendar size={16} className="mr-2" />
                      {edu.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {edu.location}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-1">
                  {edu.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start text-gray-600 dark:text-gray-300">
                      <ChevronRight size={16} className="mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}