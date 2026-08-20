import React, { useRef } from 'react';
import { useGSAP }       from '@gsap/react';
import gsap              from 'gsap';
import ScrollTrigger     from 'gsap/ScrollTrigger';
import './Services.css';

const servicesData = [
  {
    id: '01',
    category: 'Hair',
    description: 'Precision cuts, styling and color designed around your individual identity.',
    price: 'Starting from ₹1,499',
    duration: '60–120 min',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1400&auto=format&fit=crop',
    video: '/hair.mp4',
  },
  {
    id: '02',
    category: 'Skin',
    description: 'Advanced facials and clinical treatments for a radiant, sculpted complexion.',
    price: 'Starting from ₹2,999',
    duration: '45–90 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1400&auto=format&fit=crop',
    video: '/skin.mp4',
  },
  {
    id: '03',
    category: 'Makeup',
    description: 'Editorial and event makeup artistry that honours your natural architecture.',
    price: 'Starting from ₹3,499',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1512496115851-a1c8f02fbc5c?q=80&w=1400&auto=format&fit=crop',
    video: '/makeup.mp4',
  },
  {
    id: '04',
    category: 'Bridal',
    description: 'Bespoke bridal styling and beauty preparation across multiple sessions.',
    price: 'Custom quote',
    duration: 'Multiple sessions',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop',
  },
  {
    id: '05',
    category: 'Spa',
    description: 'Restorative body treatments and massage in a state of absolute calm.',
    price: 'Starting from ₹4,599',
    duration: '60–120 min',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1400&auto=format&fit=crop',
  },
];

const Services = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Animate each service row as it enters viewport
    gsap.utils.toArray('.service-row').forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Section header reveal
    gsap.from('.services-eyebrow', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });

    gsap.from('.services-headline', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
  }, { scope: sectionRef });

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="container">
        <header className="services-header">
          <p className="services-eyebrow section-eyebrow">The Collection</p>
          <h2 className="services-headline section-title serif">
            Curated Experiences
          </h2>
        </header>

        <div className="services-list">
          {servicesData.map((service, index) => (
            <article
              className={`service-row ${index % 2 !== 0 ? 'service-row--reverse' : ''}`}
              key={service.id}
            >
              {/* Text */}
              <div className="service-text">
                <span className="service-index serif">{service.id}</span>
                <div className="service-details">
                  <h3 className="service-name serif">{service.category}</h3>
                  <p className="service-desc">{service.description}</p>
                  <div className="service-meta">
                    <span>{service.price}</span>
                    <span className="service-dot">·</span>
                    <span>{service.duration}</span>
                  </div>
                  <a href="#booking" className="service-cta" aria-label={`Book ${service.category}`}>
                    Book this →
                  </a>
                </div>
              </div>

              {/* Media */}
              <div className="service-image-box" data-cursor-hover>
                {service.video ? (
                  <video
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="service-img"
                  />
                ) : (
                  <img
                    src={service.image}
                    alt={`${service.category} at AURELÉ`}
                    className="service-img"
                    loading="lazy"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
