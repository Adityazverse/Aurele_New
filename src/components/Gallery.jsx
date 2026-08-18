import React, { useRef } from 'react';
import { useGSAP }       from '@gsap/react';
import gsap              from 'gsap';
import './Gallery.css';

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1400&auto=format&fit=crop',
    alt: 'AURELÉ salon interior — warm editorial lighting',
    label: 'Studio',
  },
  {
    src: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1000&auto=format&fit=crop',
    alt: 'Precision hair styling at AURELÉ',
    label: 'Hair',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
    alt: 'Skincare treatment at AURELÉ',
    label: 'Skin',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    alt: 'Bridal styling at AURELÉ',
    label: 'Bridal',
  },
  {
    src: 'https://images.unsplash.com/photo-1512496115851-a1c8f02fbc5c?q=80&w=1000&auto=format&fit=crop',
    alt: 'Makeup artistry at AURELÉ',
    label: 'Makeup',
  },
];

const Gallery = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Clip-path reveal on each image as it enters
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.from(item, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.out',
        delay: (i % 2) * 0.15,
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Parallax: images scroll slightly slower than container
    gsap.utils.toArray('.gallery-img').forEach((img) => {
      gsap.to(img, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.gallery-item'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section className="gallery-section" id="gallery" ref={sectionRef}>
      <div className="container">
        <header className="gallery-header">
          <p className="section-eyebrow">The Aesthetic</p>
          <h2 className="section-title serif">Our Signature Look</h2>
        </header>

        <div className="gallery-grid">
          {/* Large feature image */}
          <div className="gallery-item gallery-item--featured" data-cursor-hover>
            <div className="gallery-img-wrap">
              <img src={galleryItems[0].src} alt={galleryItems[0].alt} className="gallery-img" loading="lazy" />
              <span className="gallery-label uppercase">{galleryItems[0].label}</span>
            </div>
          </div>

          {/* Right column: two stacked */}
          <div className="gallery-col">
            {[galleryItems[1], galleryItems[2]].map((item, i) => (
              <div className="gallery-item" key={i} data-cursor-hover>
                <div className="gallery-img-wrap">
                  <img src={item.src} alt={item.alt} className="gallery-img" loading="lazy" />
                  <span className="gallery-label uppercase">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row: two side-by-side */}
          {[galleryItems[3], galleryItems[4]].map((item, i) => (
            <div className="gallery-item gallery-item--wide" key={i} data-cursor-hover>
              <div className="gallery-img-wrap">
                <img src={item.src} alt={item.alt} className="gallery-img" loading="lazy" />
                <span className="gallery-label uppercase">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
