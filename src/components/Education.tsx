import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ArrowUpRight, BookOpenCheck, BrainCircuit, Code2 } from 'lucide-react';

const learningAreas = [
  { icon: BrainCircuit, label: 'Artificial intelligence & machine learning' },
  { icon: Code2, label: 'Full-stack application development' },
  { icon: BookOpenCheck, label: 'Computer science foundations' },
];

export default function Education() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className="content-section education-section"
    >
      <div className="section-container">
        <div className={`section-heading reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-kicker">04 <span>/</span> Education</p>
          <h2>Learning is <span>part of the work.</span></h2>
          <p className="section-lede">
            The foundation behind the things I build—and the questions I keep exploring.
          </p>
        </div>

        <div className={`education-card reveal ${isVisible ? 'visible' : ''}`}>
          <div className="education-marker">
            <span className="education-marker-icon">
              <BookOpenCheck size={21} aria-hidden="true" />
            </span>
            <span className="education-marker-line" aria-hidden="true" />
          </div>
          <div className="education-copy">
            <p className="education-status">Current studies</p>
            <h3>Computer Science Engineering</h3>
            <p className="education-focus">Student · Specializing in Artificial Intelligence</p>
            <p className="education-result">CGPA <span>6.72+</span></p>
            <div className="education-topics">
              {learningAreas.map(({ icon: Icon, label }) => (
                <span key={label}><Icon size={14} aria-hidden="true" />{label}</span>
              ))}
            </div>
          </div>
          <a href="/resume.pdf" download="Naganjineyulu_Resume.pdf" className="education-link">
            Résumé <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
