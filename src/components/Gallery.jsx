import React, { useRef } from 'react';
import { useGSAP }       from '@gsap/react';
import gsap              from 'gsap';
import './Gallery.css';

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1400&auto=format&fit=crop',
    alt: 'Luxury salon interior with warm ambient lighting',
    label: 'Studio',
  },
  {
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1400&auto=format&fit=crop',
    alt: 'Professional hair styling with precision tools',
    label: 'Hair',
  },
  {
    src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1400&auto=format&fit=crop',
    alt: 'Luxury spa treatment room with candles',
    label: 'Spa',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1400&auto=format&fit=crop',
    alt: 'Bridal makeup preparation in soft light',
    label: 'Bridal',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1400&auto=format&fit=crop',
    alt: 'Elegant beauty portrait with flawless skin',
    label: 'Beauty',
  },
  {
    src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1400&auto=format&fit=crop',
    alt: 'Colour treatment at a premium hair salon',
    label: 'Colour',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1400&auto=format&fit=crop',
    alt: 'Advanced clinical skincare facial treatment',
    label: 'Skin',
  },
  {
    src: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1400&auto=format&fit=crop',
    alt: 'Luxury nail art and manicure service',
    label: 'Nails',
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6f?q=80&w=1400&auto=format&fit=crop',
    alt: 'Relaxing massage therapy session',
    label: 'Wellness',
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
          {/* Row 1: Large feature + two stacked */}
          <div className="gallery-item gallery-item--featured" data-cursor-hover>
            <div className="gallery-img-wrap">
              <img src={galleryItems[0].src} alt={galleryItems[0].alt} className="gallery-img" loading="lazy" />
              <span className="gallery-label uppercase">{galleryItems[0].label}</span>
            </div>
          </div>

          <div className="gallery-col">
            {[galleryItems[1], galleryItems[2]].map((item, i) => (
              <div className="gallery-item" key={`col-${i}`} data-cursor-hover>
                <div className="gallery-img-wrap">
                  <img src={item.src} alt={item.alt} className="gallery-img" loading="lazy" />
                  <span className="gallery-label uppercase">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Three equal columns */}
          {[galleryItems[3], galleryItems[4], galleryItems[5]].map((item, i) => (
            <div className="gallery-item gallery-item--third" key={`row2-${i}`} data-cursor-hover>
              <div className="gallery-img-wrap">
                <img src={item.src} alt={item.alt} className="gallery-img" loading="lazy" />
                <span className="gallery-label uppercase">{item.label}</span>
              </div>
            </div>
          ))}

          {/* Row 3: Two wide */}
          {[galleryItems[6], galleryItems[7]].map((item, i) => (
            <div className="gallery-item gallery-item--wide" key={`row3-${i}`} data-cursor-hover>
              <div className="gallery-img-wrap">
                <img src={item.src} alt={item.alt} className="gallery-img" loading="lazy" />
                <span className="gallery-label uppercase">{item.label}</span>
              </div>
            </div>
          ))}

          {/* Row 4: Full-width cinematic */}
          <div className="gallery-item gallery-item--full" data-cursor-hover>
            <div className="gallery-img-wrap">
              <img src={galleryItems[8].src} alt={galleryItems[8].alt} className="gallery-img" loading="lazy" />
              <span className="gallery-label uppercase">{galleryItems[8].label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
