import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { BrainCircuit, Code2, GraduationCap, MapPin } from 'lucide-react';

const focusAreas = [
  {
    icon: BrainCircuit,
    title: 'Artificial intelligence',
    description: 'Exploring machine learning and practical AI applications.',
  },
  {
    icon: Code2,
    title: 'Full-stack development',
    description: 'Building responsive interfaces and the systems behind them.',
  },
  {
    icon: GraduationCap,
    title: 'Computer science',
    description: 'Growing as a Computer Science Engineering student.',
  },
];

export default function About() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="content-section about-section"
    >
      <div className="section-container">
        <div className={`section-heading reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-kicker">01 <span>/</span> A little about me</p>
          <h2>Curiosity, meet <span>craft.</span></h2>
          <p className="section-lede">
            I’m drawn to the space where intelligent systems and useful software come together.
          </p>
        </div>

        <div className="about-layout">
          <div className={`about-copy reveal-left ${isVisible ? 'visible' : ''}`}>
            <p className="about-lead">
              I’m Naganjaneyulu, a Computer Science Engineering student specializing in
              Artificial Intelligence and an aspiring AI/ML and full-stack developer.
            </p>
            <p>
              I enjoy taking an idea from a rough sketch to a working product—thinking
              through the interface, the data, and the details that make the experience
              feel clear and complete.
            </p>
            <p>
              My projects span full-stack applications and AI-focused tools. I’m driven by
              curiosity, a steady appetite for learning, and the challenge of making
              complex technology feel approachable.
            </p>
            <div className="about-location">
              <MapPin size={15} aria-hidden="true" />
              <span>Based in India</span>
            </div>
            <a href="/resume.pdf" download="Naganjineyulu_Resume.pdf" className="text-link">
              View my résumé <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="about-focus-list">
            {focusAreas.map(({ icon: Icon, title, description }, index) => (
              <article
                className={`focus-item reveal-right ${isVisible ? 'visible' : ''}`}
                key={title}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="focus-icon"><Icon size={19} aria-hidden="true" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <span className="focus-number" aria-hidden="true">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
