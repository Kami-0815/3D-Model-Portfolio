import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Instagram, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

// Pages
import Home from './pages/Home';
import ModelDetail from './pages/ModelDetail';
import About from './pages/About';
import Admin from './pages/Admin';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Galerie', path: '/' },
    { name: 'Über Mich', path: '/about' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-lg border-bottom border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-accent to-magenta-accent rounded-lg rotate-12" />
          3D<span className="text-cyan-accent">VISION</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-cyan-accent ${
                location.pathname === link.path ? 'text-cyan-accent' : 'text-white/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Kontakt
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-bg border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-white/5 bg-bg">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <h3 className="text-xl font-display font-bold">3D VISION</h3>
        <p className="text-white/40 text-sm max-w-xs">
          Digitaler Künstler spezialisiert auf High-End 3D-Modellierung, Texturierung und Environment Design.
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Social</h4>
        <div className="flex gap-4">
          <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-cyan-accent transition-colors"><Instagram size={20} /></a>
          <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-cyan-accent transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="p-2 bg-white/5 rounded-lg hover:text-cyan-accent transition-colors"><Github size={20} /></a>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Kontakt</h4>
        <a href="mailto:hello@3dvision.art" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
          <Mail size={16} /> hello@3dvision.art
        </a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-xs text-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
      <span>© {new Date().getFullYear()} 3D VISION Portfolio. Alle Rechte vorbehalten.</span>
      <Link to="/admin" className="hover:text-cyan-accent transition-colors">Admin Panel</Link>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/model/:id" element={<ModelDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
