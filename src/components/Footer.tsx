import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 md:flex-row lg:px-10">
        <a href="#home" className="footer-brand">Naganjaneyulu<span>.</span></a>
        <p>© {new Date().getFullYear()} Naganjaneyulu Medaboina</p>
        <div className="footer-links">
          <a href="https://github.com/naganjineyulu" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/medaboinanaganjineyulu-88145434b"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} aria-hidden="true" />
          </a>
          <a href="mailto:naganjaneyulumedaboina@gmail.com" aria-label="Email">
            <Mail size={17} aria-hidden="true" />
          </a>
          <a href="#home" className="back-to-top">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
