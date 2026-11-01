import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SceneBackground from '@/components/SceneBackground';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-gradient-to-r from-primary-500 to-cyan-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="site-video-background" aria-hidden="true">
        <video
          className="site-background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          <source src="/ai-circuits-background.mp4" type="video/mp4" />
        </video>
      </div>
      <SceneBackground />

      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
