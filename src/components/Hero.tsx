import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [showIdBack, setShowIdBack] = useState(false);
  const [educationUnlocked, setEducationUnlocked] = useState(false);
  const [educationPassword, setEducationPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);
  const idCardSpringFrameRef = useRef<number | null>(null);
  const idCardMotionRef = useRef({ angle: 0, y: 0 });
  const idCardDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    cardHeight: number;
    startAngle: number;
    startOffsetY: number;
    previousTime: number;
    angleVelocity: number;
    yVelocity: number;
    moved: boolean;
  } | null>(null);
  const [isIdCardDragging, setIsIdCardDragging] = useState(false);
  const [isIdCardSpringing, setIsIdCardSpringing] = useState(false);

  useEffect(() => setMounted(true), []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !portraitRef.current || idCardDragRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    portraitRef.current.style.setProperty('--portrait-x', `${x * 12}px`);
    portraitRef.current.style.setProperty('--portrait-y', `${y * 10}px`);
  };

  const resetPointer = () => {
    portraitRef.current?.style.setProperty('--portrait-x', '0px');
    portraitRef.current?.style.setProperty('--portrait-y', '0px');
  };

  const handleIdCardPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse'
      || event.button !== 0
      || (event.target instanceof Element && event.target.closest('button, input, textarea, select, a, form'))
      || !idCardRef.current
    ) {
      return;
    }

    const card = idCardRef.current;
    if (idCardSpringFrameRef.current !== null) {
      cancelAnimationFrame(idCardSpringFrameRef.current);
      idCardSpringFrameRef.current = null;
    }
    setIsIdCardSpringing(false);
    event.preventDefault();
    card.setPointerCapture(event.pointerId);
    const now = performance.now();
    idCardDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      cardHeight: card.offsetHeight,
      startAngle: idCardMotionRef.current.angle,
      startOffsetY: idCardMotionRef.current.y,
      previousTime: now,
      angleVelocity: 0,
      yVelocity: 0,
      moved: false,
    };
  };

  const handleIdCardPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = idCardDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !portraitRef.current) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 3) return;

    const now = performance.now();
    const elapsed = Math.max(1, now - drag.previousTime);
    const angle = Math.max(
      -55,
      Math.min(55, drag.startAngle + Math.atan2(deltaX, drag.cardHeight) * (180 / Math.PI)),
    );
    const y = Math.max(-220, Math.min(220, drag.startOffsetY + deltaY));
    drag.angleVelocity = (angle - idCardMotionRef.current.angle) / elapsed * 1000;
    drag.yVelocity = (y - idCardMotionRef.current.y) / elapsed * 1000;
    drag.previousTime = now;
    drag.moved = true;
    setIsIdCardDragging(true);
    idCardMotionRef.current = { angle, y };
    portraitRef.current.style.setProperty('--id-card-angle', `${angle}deg`);
    portraitRef.current.style.setProperty('--id-card-y', `${y}px`);
  };

  const startIdCardSpring = (angleVelocity: number, yVelocity: number) => {
    const motion = idCardMotionRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      motion.angle = 0;
      motion.y = 0;
      portraitRef.current?.style.setProperty('--id-card-angle', '0deg');
      portraitRef.current?.style.setProperty('--id-card-y', '0px');
      return;
    }

    setIsIdCardSpringing(true);
    let angleSpeed = Math.max(-1200, Math.min(1200, angleVelocity * 1.5));
    let ySpeed = Math.max(-1800, Math.min(1800, yVelocity * 1.5));
    let previousTime = performance.now();

    const animate = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 1000, 0.032);
      previousTime = time;

      const angleAcceleration = -180 * motion.angle - 10 * angleSpeed;
      const yAcceleration = -180 * motion.y - 10 * ySpeed;
      angleSpeed += angleAcceleration * elapsed;
      ySpeed += yAcceleration * elapsed;
      motion.angle += angleSpeed * elapsed;
      motion.y += ySpeed * elapsed;

      portraitRef.current?.style.setProperty('--id-card-angle', `${motion.angle}deg`);
      portraitRef.current?.style.setProperty('--id-card-y', `${motion.y}px`);

      if (
        Math.abs(motion.angle) < 0.08
        && Math.abs(motion.y) < 0.5
        && Math.abs(angleSpeed) < 0.8
        && Math.abs(ySpeed) < 5
      ) {
        motion.angle = 0;
        motion.y = 0;
        portraitRef.current?.style.setProperty('--id-card-angle', '0deg');
        portraitRef.current?.style.setProperty('--id-card-y', '0px');
        idCardSpringFrameRef.current = null;
        setIsIdCardSpringing(false);
        return;
      }

      idCardSpringFrameRef.current = requestAnimationFrame(animate);
    };

    idCardSpringFrameRef.current = requestAnimationFrame(animate);
  };

  const finishIdCardDrag = (pointerId: number) => {
    const drag = idCardDragRef.current;
    if (!drag || drag.pointerId !== pointerId) return;

    idCardDragRef.current = null;
    setIsIdCardDragging(false);
    if (drag.moved) {
      startIdCardSpring(drag.angleVelocity, drag.yVelocity);
    }
  };

  useEffect(() => () => {
    if (idCardSpringFrameRef.current !== null) {
      cancelAnimationFrame(idCardSpringFrameRef.current);
    }
  }, []);

  const openIdBack = () => {
    setShowIdBack(true);
    setPasswordError(false);
  };

  const closeIdBack = () => {
    setShowIdBack(false);
    setEducationUnlocked(false);
    setEducationPassword('');
    setPasswordError(false);
  };

  const unlockEducation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (educationPassword === '2580') {
      setEducationUnlocked(true);
      setPasswordError(false);
      setEducationPassword('');
      return;
    }

    setPasswordError(true);
    setEducationPassword('');
  };

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="hero-section relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="hero-content relative z-10 mx-auto grid w-full max-w-7xl items-center gap-4 px-6 pb-20 pt-28 lg:grid-cols-[1.06fr_0.94fr] lg:px-10">
        <div className="hero-copy relative z-10 max-w-2xl">
          <p className={`hero-eyebrow ${mounted ? 'is-visible' : ''}`}>
            <span className="hero-status-dot" />
            AI · Engineering · The web
          </p>

          <h1 className={`hero-title ${mounted ? 'is-visible' : ''}`}>
            <span className="hero-title-intro">Hi, I’m</span>
            <span className="hero-title-name">
              Naganjaneyulu
              <span className="hero-title-surname">Medaboina</span>
            </span>
          </h1>

          <p className={`hero-role ${mounted ? 'is-visible' : ''}`}>
            AI/ML Engineer <span aria-hidden="true">/</span> Full Stack Developer
          </p>

          <p className={`hero-description ${mounted ? 'is-visible' : ''}`}>
            I’m a Computer Science Engineering student focused on artificial intelligence
            and full-stack development—building thoughtful digital experiences from idea
            to implementation.
          </p>

          <div className={`hero-actions ${mounted ? 'is-visible' : ''}`}>
            <a href="#projects" className="button-primary">
              Explore My Projects <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="/resume.pdf" download="Naganjineyulu_Resume.pdf" className="button-secondary">
              Download Resume
            </a>
          </div>

          <div className={`hero-socials ${mounted ? 'is-visible' : ''}`}>
            <a
              href="https://github.com/naganjineyulu"
              target="_blank"
              rel="noreferrer"
              aria-label="Naganjaneyulu on GitHub"
            >
              <Github size={17} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <span className="hero-social-divider" aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/medaboinanaganjineyulu-88145434b"
              target="_blank"
              rel="noreferrer"
              aria-label="Naganjaneyulu on LinkedIn"
            >
              <Linkedin size={17} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <span className="hero-social-divider" aria-hidden="true" />
            <a href="mailto:naganjineyulumedaboina@gmail.com">
              <Mail size={17} aria-hidden="true" />
              <span>Get in touch</span>
            </a>
          </div>
        </div>

        <div
          ref={portraitRef}
          className={`hero-portrait ${mounted ? 'is-visible' : ''} ${isIdCardDragging ? 'is-id-card-dragging' : ''} ${isIdCardSpringing ? 'is-id-card-springing' : ''}`}
          aria-label="Naganjaneyulu's profile ID card"
        >
          <div
            ref={idCardRef}
            className={`portrait-id-card ${showIdBack ? 'is-returning' : ''} ${isIdCardDragging ? 'is-dragging' : ''} ${isIdCardSpringing ? 'is-springing' : ''}`}
            onPointerDown={handleIdCardPointerDown}
            onPointerMove={handleIdCardPointerMove}
            onPointerUp={(event) => finishIdCardDrag(event.pointerId)}
            onPointerCancel={(event) => finishIdCardDrag(event.pointerId)}
          >
            {showIdBack ? (
              <div key="id-back" className="portrait-id-content portrait-id-back">
                <div className="portrait-id-header">
                  <span>EDUCATION RECORD</span>
                  <button type="button" onClick={closeIdBack} className="portrait-id-turn">
                    FRONT ↻
                  </button>
                </div>

                {educationUnlocked ? (
                  <div className="education-record-list">
                    <article className="education-record">
                      <span>10TH CLASS</span>
                      <h3>Tirumala Oxford School</h3>
                      <p>Piduguralla</p>
                      <p className="education-record-marks">Marks: 85%</p>
                    </article>
                    <article className="education-record">
                      <span>12TH CLASS</span>
                      <h3>Oxford Junior College</h3>
                      <p>Piduguralla</p>
                      <p className="education-record-marks">Marks: 65.6%</p>
                    </article>
                    <article className="education-record">
                      <span>B.TECH</span>
                      <h3>Parul University</h3>
                      <p>Vadodara</p>
                      <p className="education-record-marks">CGPA: 6.72 (current)</p>
                    </article>
                  </div>
                ) : (
                  <form className="education-lock-form" onSubmit={unlockEducation}>
                    <p className="portrait-id-label">ENTER THE 4-DIGIT PASSWORD TO VIEW THE EDUCATION DETAILS</p>
                    <label htmlFor="education-card-password">Password</label>
                    <input
                      id="education-card-password"
                      type="password"
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={4}
                      value={educationPassword}
                      onChange={(event) => {
                        setEducationPassword(event.target.value.replace(/\D/g, ''));
                        setPasswordError(false);
                      }}
                      aria-invalid={passwordError}
                      aria-describedby={passwordError ? 'education-password-error' : undefined}
                      placeholder="••••"
                    />
                    {passwordError && <p id="education-password-error" className="education-password-error">That password did not match. Try again.</p>}
                    <button type="submit" className="education-unlock-button">UNLOCK DETAILS</button>
                  </form>
                )}
              </div>
            ) : (
              <div key="id-front" className="portrait-id-content portrait-id-front">
                <div className="portrait-id-header">
                  <span>PORTFOLIO ID</span>
                  <span>01 / 06</span>
                </div>
                <div className="portrait-id-main">
                  <div
                    className="portrait-photo"
                    onDoubleClick={openIdBack}
                    title="Double-click to turn the ID card"
                  >
                    <img
                      src="/profile.png"
                      alt="Naganjaneyulu wearing a black suit, white shirt, and black tie"
                      className="portrait-image"
                      draggable={false}
                      decoding="async"
                    />
                  </div>
                  <div className="portrait-id-details">
                    <p className="portrait-id-label">NAME</p>
                    <h2>Naganjaneyulu Medaboina</h2>
                    <p className="portrait-id-label">ROLE</p>
                    <p className="portrait-id-role">AI/ML Engineer<br />Full Stack Developer</p>
                  </div>
                </div>
                <div className="portrait-id-footer">
                  <span><span className="portrait-id-status" /> COMPUTER SCIENCE ENGINEERING</span>
                  <button type="button" onClick={openIdBack} className="portrait-id-turn">VIEW BACK ↻</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-cue absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll to about section"
      >
        <span>Scroll to explore</span>
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
