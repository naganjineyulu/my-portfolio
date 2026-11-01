import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const updateNavigation = () => {
      setScrolled(window.scrollY > 24);
      const marker = window.innerHeight * 0.35;
      const currentSection = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });

      if (currentSection) {
        setActive(`#${currentSection.id}`);
      } else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        setActive('#contact');
      }
    };
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);

    return () => {
      window.removeEventListener('scroll', updateNavigation);
      window.removeEventListener('resize', updateNavigation);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}>
      <nav aria-label="Primary navigation" className="site-nav mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#home" className="brand-mark" onClick={() => setOpen(false)}>
          <span className="brand-monogram" aria-hidden="true">N</span>
          <span>Naganjaneyulu<span className="brand-period">.</span></span>
        </a>

        <ul className="nav-links hidden items-center md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? 'location' : undefined}
                className={active === link.href ? 'is-active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-contact hidden md:inline-flex">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="menu-toggle md:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="mobile-nav md:hidden">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? 'location' : undefined}
                  className={active === link.href ? 'is-active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
