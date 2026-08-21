import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';

export default function Hero() {
  const typed = useTypingEffect(
    ['Full Stack Developer', 'MERN Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'],
    80,
    1800
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Glowing orbs */}
      <div className="orb bg-primary-500/30 w-[400px] h-[400px] -top-20 -left-20" />
      <div className="orb bg-cyan-400/20 w-[500px] h-[500px] bottom-0 -right-20" style={{ animationDelay: '2s' }} />

      {/* Orbiting tech badges */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px]">
          <div className="orbit-ring absolute inset-0" />
          <div className="orbit-ring absolute inset-12" />
          <div className="orbit-ring absolute inset-24" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <div
          className={`inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary-300 mb-8 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Sparkles size={14} className="text-primary-400" />
          Available for opportunities
        </div>

        <div className={`mb-8 flex justify-center transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <img
            src="/profile.png"
            alt="Naganjaneyulu Medaboina"
            className="h-32 w-32 rounded-full border-4 border-primary-500/40 object-cover shadow-[0_0_40px_rgba(34,211,238,0.25)] md:h-40 md:w-40"
          />
        </div>

        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-slate-100">Hi, I'm</span>
          <span className="block gradient-text text-glow mt-2">Naganjaneyulu Medaboina</span>
        </h1>

        <div
          className={`h-10 mb-6 transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xl md:text-2xl font-mono text-primary-400 typing-cursor">
            {typed}
          </p>
        </div>

        <p
          className={`max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed mb-10 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Computer Science graduate passionate about building scalable web applications
          and elegant user experiences with the MERN stack and modern technologies.
        </p>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-cyan-400 px-7 py-3.5 font-semibold text-dark-900 transition-all hover:shadow-glow-blue hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-500/40 bg-white/5 px-7 py-3.5 font-semibold text-slate-200 transition-all hover:bg-primary-500/10 hover:border-primary-500/60"
          >
            <Mail size={18} /> Get in Touch
          </a>
        </div>

        <div
          className={`flex items-center justify-center gap-6 mt-12 transition-all duration-700 delay-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {[
            { Icon: Github, href: 'https://github.com', label: 'GitHub' },
            { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { Icon: Mail, href: '#contact', label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-lg glass text-slate-300 transition-all hover:text-primary-400 hover:border-primary-500/40 hover:-translate-y-1"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary-400 transition-colors animate-bounce-slow"
        aria-label="Scroll down"
      >
        <ArrowDown size={28} />
      </a>
    </section>
  );
}
