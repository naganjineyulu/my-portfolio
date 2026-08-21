import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  Code2, Database, Server, Layout, GitBranch, Cpu,
} from 'lucide-react';

const skillGroups = [
  {
    title: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'HTML / CSS', level: 92 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 88 },
      { name: 'Python', level: 75 },
    ],
  },
  {
    title: 'Database & Tools',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 87 },
      { name: 'SQL', level: 80 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'Postman', level: 82 },
    ],
  },
];

const techBadges = [
  'React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript',
  'Python', 'HTML', 'CSS', 'Tailwind', 'Git', 'REST API', 'JWT',
  'Redux', 'Figma', 'Vercel', 'MySQL', 'C++', 'DSA',
];

export default function Skills() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="skills" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 md:py-32">
      <div className="orb bg-cyan-400/15 w-[400px] h-[400px] top-1/4 -left-32" />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`reveal ${isVisible ? 'visible' : ''} text-center mb-14`}>
          <p className="font-mono text-primary-400 text-sm mb-3">// 02. my skills</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Technologies I Work With
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A blend of frontend, backend, and database technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skillGroups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className={`glass-card rounded-2xl p-6 reveal ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${gi * 120}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/15 border border-primary-500/30 text-primary-400">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-lg font-semibold text-slate-100">{group.title}</h3>
                </div>

                <div className="space-y-4">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-primary-400 font-mono text-xs">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-dark-600 overflow-hidden">
                        <div
                          className={`skill-bar-fill ${isVisible ? 'animate' : ''} h-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400`}
                          style={{ ['--skill-width' as string]: `${skill.level}%`, transitionDelay: `${si * 100}ms` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-center text-sm font-semibold text-slate-300 mb-6 uppercase tracking-wider">
              Tech Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techBadges.map((tech, i) => (
                <span
                  key={tech}
                  className="rounded-lg border border-primary-500/20 bg-dark-700/50 px-4 py-2 text-sm font-mono text-slate-300 transition-all hover:border-primary-500/50 hover:text-primary-300 hover:-translate-y-1 hover:shadow-glow-blue"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
