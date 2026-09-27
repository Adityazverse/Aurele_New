import React, { useRef } from 'react';
import { useGSAP }       from '@gsap/react';
import gsap              from 'gsap';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    client: 'SOPHIA LAUREN',
    quote: 'An unparalleled experience. The attention to detail and level of craftsmanship at Aurelé is simply unmatched in the city.',
  },
  {
    id: 2,
    client: 'ISABELLA W.',
    quote: 'From the moment you walk in, you are enveloped in calm. My bridal styling was flawless, exceeding every expectation.',
  },
  {
    id: 3,
    client: 'CHLOE M.',
    quote: 'True artistry. They didn’t just cut my hair; they designed a look that perfectly captured my personal identity.',
  }
];

const Testimonials = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Stagger fade up for testimonials
    gsap.from('.testimonial-item', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });

    // Reveal separator lines
    gsap.from('.testimonial-separator', {
      scaleY: 0,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 85%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="container">
        <header className="text-center mb-xl">
          <p className="section-eyebrow">Client Journals</p>
          <h2 className="section-title serif">Words of Praise</h2>
        </header>

        {/* Desktop: Grid with vertical separators. Mobile: Horizontal scroll snap */}
        <div className="testimonials-grid">
          {testimonialsData.map((t, index) => (
            <React.Fragment key={t.id}>
              <div className="testimonial-item text-center">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-quote serif">"{t.quote}"</p>
                <p className="testimonial-client uppercase">— {t.client}</p>
              </div>

              {/* Vertical line between items (hidden on last item and mobile) */}
              {index < testimonialsData.length - 1 && (
                <div className="testimonial-separator" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
