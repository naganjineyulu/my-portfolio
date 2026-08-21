import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-primary-500/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 flex items-center gap-1.5">
          Designed & built  <Heart size={14} className="text-primary-400 fill-primary-400" /> by Naganjaneyulu Medaboina
        </p>
        <p className="text-xs text-slate-600 font-mono">© {new Date().getFullYear()} All rights reserved</p>
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary-400 transition-colors"
        >
          Back to top <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
