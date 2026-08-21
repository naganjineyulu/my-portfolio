import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Mail, Phone, MapPin } from 'lucide-react';

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.76 7.83a5.87 5.87 0 0 0-8.3 0 5.69 5.69 0 0 0-1.48 5.83l-.54 2.07 2.12-.56a5.7 5.7 0 0 0 5.83-1.5 5.87 5.87 0 0 0 0-8.3Zm-1.75 7.66c-.03.08-.98.86-1.14.92-.18.06-.38.09-.58.05-.21-.04-1.2-.45-2.29-1.4a9.95 9.95 0 0 1-2.35-2.44 3.28 3.28 0 0 1-.44-1.2c0-.15.02-.23.08-.28.14-.09.3-.22.45-.34.15-.11.2-.2.3-.4.1-.18.05-.4-.02-.56-.08-.18-.58-1.4-.8-1.92-.2-.48-.42-.42-.58-.43-.14-.01-.3-.01-.46-.01a1.32 1.32 0 0 0-.98.46c-.34.36-1.3 1.28-1.3 3.1 0 1.82 1.33 3.57 1.52 3.81.18.24 2.61 4 6.32 5.59.88.38 1.56.61 2.09.78.88.29 1.68.25 2.31.15.71-.12 2.18-.9 2.49-1.77.32-.9.32-1.67.23-1.83-.09-.16-.36-.26-.76-.45-.4-.19-2.37-1.1-2.74-1.22Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver();

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'naganjineyulumedaboina@gmail.com', href: 'mailto:naganjineyulumedaboina@gmail.com' },
    { icon: Phone, label: 'Phone', value: '8886546562', href: 'tel:8886546562' },
    { icon: MapPin, label: 'Location', value: 'India', href: '#' },
  ];

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 md:py-32">
      <div className="orb bg-primary-500/20 w-[450px] h-[450px] top-0 left-1/4" />
      <div className="max-w-5xl mx-auto px-6">
        <div className={`reveal ${isVisible ? 'visible' : ''} text-center mb-14`}>
          <p className="font-mono text-primary-400 text-sm mb-3">// 05. contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Let's Build Something
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className={`md:col-span-2 space-y-4 reveal-left ${isVisible ? 'visible' : ''}`}>
            {contactInfo.map(info => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all hover:-translate-y-1 hover:border-primary-500/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-500/15 border border-primary-500/30 text-primary-400">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{info.label}</p>
                    <p className="text-sm text-slate-200 font-medium">{info.value}</p>
                  </div>
                </a>
              );
            })}

          </div>

          <div className={`md:col-span-3 glass-card rounded-2xl p-6 md:p-8 reveal-right ${
              isVisible ? 'visible' : ''
            }`}>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  Send a message directly on WhatsApp for faster response and hiring inquiries.
                </p>
                <a
                  href="https://wa.me/918886546562"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-6 py-5 text-slate-100 transition-all hover:bg-primary-500/15 hover:text-primary-200"
                >
                  <WhatsAppIcon size={24} />
                  <span className="font-medium">Chat on WhatsApp +91 88865 46562</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
