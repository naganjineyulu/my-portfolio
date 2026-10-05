import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Projects', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = links.map(l => l.href.slice(1));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive('#' + id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
      >
        <a href="#home" className="group flex items-center gap-2">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-cyan-400 text-dark-900 font-bold text-lg shadow-glow-blue transition-transform group-hover:scale-110">
            A
          </span>
          <span className="font-bold text-lg tracking-tight">
            <span className="gradient-text">Naganjaneyulu</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  active === link.href
                    ? 'text-primary-400'
                    : 'text-slate-300 hover:text-primary-400'
                }`}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-cyan-400" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-lg border border-primary-500/40 bg-primary-500/10 px-5 py-2 text-sm font-semibold text-primary-400 transition-all hover:bg-primary-500/20 hover:shadow-glow-blue"
        >
          Hire Me
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-200 hover:text-primary-400 transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass mt-3 mx-4 rounded-xl p-4 animate-fade-in">
          <ul className="flex flex-col gap-1">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition ${
                    active === link.href
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-slate-300 hover:text-primary-400 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
