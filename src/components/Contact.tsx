import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

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

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'naganjaneyulumedaboina@gmail.com',
    href: 'mailto:naganjaneyulumedaboina@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'View my LinkedIn profile',
    href: 'https://www.linkedin.com/in/medaboinanaganjineyulu-88145434b',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 88865 46562',
    href: 'tel:+918886546562',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: 'https://maps.google.com/?q=India',
  },
];

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="content-section contact-section"
    >
      <div className="section-container">
        <div className={`section-heading reveal ${isVisible ? 'visible' : ''}`}>
          <p className="section-kicker">05 <span>/</span> Get in touch</p>
          <h2>Have something <span>in mind?</span></h2>
          <p className="section-lede">
            For project conversations, opportunities, or a friendly hello—reach out directly.
          </p>
        </div>

        <div className="contact-layout">
          <div className={`contact-details reveal-left ${isVisible ? 'visible' : ''}`}>
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('https://') ? '_blank' : undefined}
                rel={href.startsWith('https://') ? 'noreferrer' : undefined}
                className="contact-detail"
              >
                <Icon size={18} aria-hidden="true" />
                <div>
                  <p>{label}</p>
                  <span>{value}</span>
                </div>
                <ArrowUpRight size={15} className="contact-detail-arrow" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className={`contact-cta reveal-right ${isVisible ? 'visible' : ''}`}>
            <div className="contact-cta-orb" aria-hidden="true" />
            <p className="contact-cta-kicker">Prefer a quick chat?</p>
            <h3>Let’s start a conversation.</h3>
            <p className="contact-cta-copy">
              Send a message directly on WhatsApp for project inquiries and opportunities.
            </p>
            <a
              href="https://wa.me/918886546562"
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              <WhatsAppIcon size={18} />
              Chat on WhatsApp
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
