import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { BrainCircuit, Code2, Database, Layout, Wrench } from 'lucide-react';

const skillGroups = [
  {
    title: 'Programming languages',
    icon: Code2,
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
  },
  {
    title: 'AI & machine learning',
    icon: BrainCircuit,
    skills: ['Artificial Intelligence', 'Machine Learning', 'NLP', 'Generative AI', 'LLMs'],
  },
  {
    title: 'Web development',
    icon: Layout,
    skills: ['React', 'Node.js', 'Express', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Databases & APIs',
    icon: Database,
    skills: ['MongoDB', 'MySQL', 'SQL', 'REST APIs', 'JWT'],
  },
  {
    title: 'Tools & workflow',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Postman', 'Redux', 'Figma', 'Vercel'],
  },
];

export default function Skills() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="content-section skills-section"
    >
      <div className="section-container">
        <div className={`section-heading reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-kicker">02 <span>/</span> The toolkit</p>
          <h2>Tools for turning <span>ideas into reality.</span></h2>
          <p className="section-lede">
            Technologies I’ve worked with across my web development and AI projects.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map(({ title, icon: Icon, skills }, index) => (
            <article
              className={`skill-card reveal ${isVisible ? 'visible' : ''}`}
              key={title}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="skill-card-heading">
                <span className="skill-icon"><Icon size={18} aria-hidden="true" /></span>
                <h3>{title}</h3>
              </div>
              <ul className="skill-tags">
                {skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
