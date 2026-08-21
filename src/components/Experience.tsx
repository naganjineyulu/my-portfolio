import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const timeline = [
  {
    type: 'project',
    icon: Briefcase,
    title: 'Event Management System',
    org: 'Academic Project',
    period: '2025',
    description:
      'A full-stack event management platform to create, manage, and register events with user authentication and real-time updates.',
    points: [
      'Implemented responsive event listing and registration flows using React',
      'Built secure backend APIs with Node.js, Express, and MongoDB',
      'Added real-time notifications and admin dashboards for event organizers',
    ],
  },
  {
    type: 'project',
    icon: Award,
    title: 'AI Resume Screening Platform',
    org: 'Academic project',
    period: '2026',
    description:
      'An AI-driven resume screening tool that analyzes candidate profiles and matches them with job requirements to improve hiring efficiency.',
    points: [
      'Developed NLP-based resume parsing and scoring logic in Python',
      'Created an intuitive frontend for recruiters to review candidate matches',
      'Integrated feedback loops for continuous model improvement',
    ],
  },
  {
    type: 'project',
    icon: Briefcase,
    title: 'AI-Diet-Recommendation',
    org: 'Personal Project',
    period: '2026',
    description:
      'An AI-powered diet recommendation app that suggests personalized meal plans based on user health goals, preferences, and dietary restrictions.',
    points: [
      'Built recommendation engine using machine learning and nutritional data',
      'Developed user-friendly UI for tracking meals and preferences',
      'Integrated feedback-based personalization to refine diet suggestions',
    ],
  },
  {
    type: 'project',
    icon: Award,
    title: 'Farmer Friendly',
    org: 'Personal Project',
    period: '2026',
    description:
      'A farmer support platform designed to provide crop advice, market insights, and easy access to agri-resources in a user-friendly format.',
    points: [
      'Created intuitive farmer-focused dashboards and resource pages',
      'Added crop recommendation features using agricultural data',
      'Implemented offline-friendly access for rural areas',
    ],
  },
];

export default function Experience() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="experience" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className={`reveal ${isVisible ? 'visible' : ''} mb-14`}>
          <p className="font-mono text-primary-400 text-sm mb-3">// 04. projects</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            My Projects
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Practical applications I've built to solve real problems and showcase my skills.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-500/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Node */}
                  <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 z-10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-800 border-2 border-primary-500 text-primary-400 shadow-glow-blue">
                      <Icon size={18} />
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                  >
                    <div
                      className={`glass-card rounded-2xl p-6 reveal ${isVisible ? 'visible' : ''}`}
                      style={{ transitionDelay: `${i * 150}ms` }}
                    >
                      <span className="inline-block rounded-full bg-primary-500/15 border border-primary-500/30 px-3 py-1 text-xs font-mono text-primary-300 mb-3">
                        {item.period}
                      </span>
                      <h3 className="text-lg font-bold text-slate-100 mb-1">{item.title}</h3>
                      <p className="text-sm text-primary-400 mb-3">{item.org}</p>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <ul className={`space-y-2 ${isLeft ? 'md:text-left' : ''}`}>
                        {item.points.map((p, pi) => (
                          <li key={pi} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
