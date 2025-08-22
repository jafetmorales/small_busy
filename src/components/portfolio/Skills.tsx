import { useRef, useEffect, useState } from "react";
import { Code, Database, Palette, Cpu, Globe, Brain } from "lucide-react";

export default function Skills() {
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

  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Database size={32} />,
      title: "Backend Development",
      skills: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB", "Redis"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe size={32} />,
      title: "Cloud & DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Git"],
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Brain size={32} />,
      title: "AI & Machine Learning",
      skills: ["TensorFlow", "PyTorch", "OpenAI API", "Computer Vision", "NLP", "Data Science"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Palette size={32} />,
      title: "Design & UX",
      skills: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Prototyping", "User Research"],
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Cpu size={32} />,
      title: "3D & Graphics",
      skills: ["Three.js", "WebGL", "Blender", "Unity", "Shader Programming", "3D Modeling"],
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const technicalSkills = [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 88 },
    { name: "Python", level: 85 },
    { name: "Three.js", level: 82 },
    { name: "AWS", level: 80 },
    { name: "PostgreSQL", level: 85 },
    { name: "UI/UX Design", level: 75 }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable, and innovative applications.
            </p>
          </div>

          {/* Skill categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-700 hover:shadow-xl hover:scale-105 ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center text-white mb-4 mx-auto`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technical proficiency */}
          <div
            className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-lg transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Technical Proficiency
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100 + 500}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}