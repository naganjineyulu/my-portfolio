import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Briefcase, GraduationCap, MapPin, Code2, Heart, Download } from 'lucide-react';

const stats = [
  { value: '6.72+', label: 'CGPA', icon: GraduationCap },
  { value: '5+', label: 'Projects Built', icon: Code2 },
  { value: '5+', label: 'Technologies', icon: Briefcase },
  { value: '4', label: 'Year Coding', icon: Heart },
];

export default function About() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          <p className="font-mono text-primary-400 text-sm mb-3">// 01. about me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-12">
            Who I Am
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`reveal-left ${isVisible ? 'visible' : ''}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-primary-500/30 to-cyan-400/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative glass-card rounded-2xl p-8">
                <div className="flex justify-center mb-6">
                  <img
                    src="/profile.png"
                    alt="Naganjaneyulu - AI and Full Stack Developer"
                    className="h-40 w-40 rounded-full border-4 border-primary-500/30 object-cover shadow-xl"
                  />
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <span className="text-primary-400 font-semibold">Naganjaneyulu</span> is a Computer
                  Science Engineering student specializing in Artificial Intelligence and an aspiring
                  AI & Full Stack Developer. I build digital experiences with full-stack technologies
                  and love turning complex problems into clean, intuitive solutions.
                </p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  During my academic journey, I've built scalable web applications, RESTful APIs,
                  and explored machine learning. I'm driven by curiosity and the desire to create
                  software that makes a real impact.
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  When I'm not coding, you'll find me exploring new technologies, contributing to
                  open-source, or refining my UI/UX design skills.
                </p>

                <div className="flex flex-wrap gap-3">
                  {/* Updated Download Resume Button */}
                  <a
                    href="/resume.pdf"
                    download="Naganjineyulu_Resume.pdf"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-500/15 border border-primary-500/30 px-4 py-2 text-sm font-medium text-primary-300 hover:bg-primary-500/25 transition"
                  >
                    <Download size={16} /> Download Resume
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm text-slate-400">
                    <MapPin size={16} /> India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={`reveal-right ${isVisible ? 'visible' : ''}`}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="glass-card rounded-xl p-6 text-center transition-all hover:-translate-y-1"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <Icon className="mx-auto mb-3 text-primary-400" size={28} />
                    <div className="text-3xl font-bold gradient-text mb-1">{s.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 glass-card rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                Currently exploring
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Docker', 'AWS', 'GraphQL', 'Three.js'].map(t => (
                  <span
                    key={t}
                    className="rounded-md bg-primary-500/10 border border-primary-500/20 px-3 py-1.5 text-xs font-mono text-primary-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
