import { useEffect, useState } from "react";
import { ChevronDown, BellRing, Activity, MapPin } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = ["Competitor Changes", "Site Score Shifts", "New Local Opportunities", "Actionable Alerts"];

  useEffect(() => {
    const currentRole = roles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text !== currentRole) {
          setText(currentRole.substring(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (text !== "") {
          setText(currentRole.substring(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isDeleting]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Bebedio <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Alerts</span>
          </h1>

          {/* Animated role text */}
          <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span className="border-r-2 border-blue-600 pr-2 animate-pulse">
              {text}
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Weekly competitor & opportunity alerts for local service businesses. We monitor rating shifts, offer & content changes, site performance and emerging zip code demand—then send a 5‑minute action summary so you move first.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <BellRing size={18} /> Start Free Trial
            </a>
            <a
              href="#how-it-works"
              onClick={() => { window.history.pushState({}, '', '#how-it-works'); scrollToSection('#how-it-works'); }}
              className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <Activity size={18} /> How It Works
            </a>
            <a
              href="#contact"
              onClick={() => { window.history.pushState({}, '', '#contact'); scrollToSection('#contact'); }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <MapPin size={18} /> Talk to Us
            </a>
          </div>

          {/* Value prop quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
            {[
              { label: "Competitors Monitored", value: "5+" },
              { label: "Avg. Open Rate", value: "35%" },
              { label: "Action Time Saved", value: "3h/wk" },
              { label: "Opportunity Wins", value: "+18%" },
            ].map((item) => (
              <div key={item.label} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-lg p-4 shadow hover:shadow-lg transition">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollToSection("#about")}
            className="animate-bounce text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}