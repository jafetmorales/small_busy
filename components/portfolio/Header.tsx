import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { Link } from "react-router-dom";

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
    const { user, signOut } = useAuth();
    const [name, setName] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const [temp, setTemp] = useState('');

    async function fetchProfile() {
      if (!user) { setName(null); return; }
      try {
        const token = (await supabase.auth.getSession()).data.session?.access_token;
        if (!token) return;
        const res = await fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setName(data.name);
        }
      } catch { /* noop */ }
    }

    useEffect(() => { fetchProfile(); }, [user]);

    async function saveName() {
      const newName = temp.trim();
      if (!newName) return;
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      if (!token) return;
      const res = await fetch('/api/profile', { method: 'POST', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: newName }) });
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setEditing(false);
      }
    }


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-white transition-colors"
          >
            Bebedio Alerts
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >{item.label}</Link>
            ))}
            {user && (
                <div className="flex items-center gap-2">
                  {!editing && (
                    <button onClick={()=> { setTemp(name||''); setEditing(true); }} className="text-sm px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
                      {name ? name : 'Set name'}
                    </button>
                  )}
                  {editing && (
                    <div className="flex items-center gap-1">
                      <input value={temp} onChange={e=>setTemp(e.target.value)} className="text-sm px-2 py-1 rounded border bg-transparent" placeholder="Name" />
                      <button onClick={saveName} className="text-sm px-2 py-1 rounded bg-blue-600 text-white">Save</button>
                      <button onClick={()=> setEditing(false)} className="text-sm px-2 py-1 rounded">X</button>
                    </div>
                  )}
                </div>
            )}
            {!user && <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Login</Link>}
            {!user && <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">Start Trial</Link>}
            {user && <button onClick={()=>signOut()} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Logout</button>}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {menuItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >{item.label}</Link>
              ))}
              {!user && <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block text-left bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >Start Trial</Link>}
              {user && <button onClick={()=> { setIsMenuOpen(false); signOut(); }} className="text-left bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">Logout</button>}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}