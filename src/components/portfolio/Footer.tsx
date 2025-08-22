import { Heart, ShieldCheck, BarChart3 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Bebedio Intelligence</h3>
              <p className="text-gray-300 leading-relaxed">
                Enterprise-grade business intelligence for small businesses. Turn disconnected data into clear, confident growth execution.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Platform
                  </a>
                </li>
                <li>
                  <a
                    href="#solutions"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#case-study"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Case Study
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-gray-300">
                <div>
                  <span className="hover:text-white transition-colors">support@bebedio.com</span>
                </div>
                <div>
                  <span className="hover:text-white transition-colors">(726) 233-2698</span>
                </div>
                <div>San Antonio, TX</div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0 text-sm">
                <BarChart3 size={16} className="text-blue-500" />
                <span>Data secured with</span>
                <ShieldCheck size={16} className="text-green-500" />
                <span>industry best practices • Built with <Heart size={14} className="text-red-500" /></span>
              </div>
              
              <div className="text-gray-400 text-sm">
                © {currentYear} Bebedio Intelligence. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}