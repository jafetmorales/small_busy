import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "@fontsource/inter";

// Company Site Components (Rebranded)
import Header from "./components/portfolio/Header.tsx";
import { AuthProvider } from './components/auth/AuthProvider';
import Footer from "./components/portfolio/Footer.tsx";
import SolutionDetail from "./components/company/SolutionDetail.tsx";
// Page shells
import Home from "./pages/Home";
import Platform from "./pages/Platform"; // legacy (can remove later)
import SolutionsPage from "./pages/SolutionsPage"; // legacy
import CaseStudyPage from "./pages/CaseStudyPage"; // legacy
import ActionPlanPage from "./pages/ActionPlanPage"; // legacy
import ContactPage from "./pages/ContactPage";
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Signup from './pages/Signup';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/signup" element={<Layout><Signup /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          {/* Legacy pages (temporarily accessible) */}
          <Route path="/platform" element={<Layout><Platform /></Layout>} />
          <Route path="/solutions" element={<Layout><SolutionsPage /></Layout>} />
          <Route path="/solutions/:slug" element={<Layout><SolutionDetail /></Layout>} />
          <Route path="/case-study" element={<Layout><CaseStudyPage /></Layout>} />
          <Route path="/action-plan" element={<Layout><ActionPlanPage /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
