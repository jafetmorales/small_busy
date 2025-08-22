import { useRef, useEffect, useState } from "react";
import { BarChart3, Layers, Shield, Target, Activity } from "lucide-react";

export default function About() {
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

  const stats = [
    { icon: <Target size={24} />, number: "35%", label: "Lead Lift Target" },
    { icon: <BarChart3 size={24} />, number: "12+", label: "Core Dashboards" },
    { icon: <Activity size={24} />, number: "24h", label: "Sync Interval" },
    { icon: <Shield size={24} />, number: "100%", label: "Data Ownership" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Overview
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A unified intelligence layer that turns scattered small business data into clear growth execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                From Raw Data To Revenue Decisions
              </h3>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Bebedio Intelligence connects your POS, CRM, marketing, review, and financial data sources into a single, trusted model. No more exporting spreadsheets or guessing which channel is working.
                </p>
                <p>
                  Our platform surfaces root-cause insights (not vanity charts) and pairs them with proven playbooks: review generation, referral acceleration, offer sequencing, seasonal campaigns, and retention reactivation.
                </p>
                <p>
                  You get continuous benchmarks versus local and industry peers, automated opportunity alerts, and an execution checklist that updates as you complete actions.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Unified KPI framework across Marketing, Operations, Revenue</li>
                  <li>Proprietary lead & lifetime value projection engine</li>
                  <li>Automated anomaly & churn risk detection</li>
                  <li>Secure, portable data – you always own it</li>
                </ul>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}