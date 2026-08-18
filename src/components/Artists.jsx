import React, { useRef } from 'react';
import { useGSAP }       from '@gsap/react';
import gsap              from 'gsap';
import './Artists.css';

const artistsData = [
  {
    id: 1,
    name: 'MAYA SHARMA',
    role: 'Creative Director',
    experience: '12+ years experience',
    bio: 'Specializes in precision cuts, architectural styling and the signature Aurelé aesthetic.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'DAVID CHEN',
    role: 'Master Colorist',
    experience: '10+ years experience',
    bio: 'Renowned for dimensional balayage, seamless color correction, and vibrant transformations.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'ELENA ROSTOVA',
    role: 'Skin Specialist',
    experience: '15+ years experience',
    bio: 'Focuses on clinical skincare, sculpting facial massage and holistic dermal health.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop'
  }
];

const Artists = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from('.artist-card', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.artists-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });

    gsap.from('.artists-eyebrow, .artists-headline', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.artists-header',
        start: 'top 85%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="artists-section" id="artists" ref={sectionRef}>
      <div className="container">
        <header className="artists-header text-center">
          <p className="artists-eyebrow section-eyebrow">The Collective</p>
          <h2 className="artists-headline section-title serif">Meet the Masters</h2>
        </header>

        <div className="artists-grid">
          {artistsData.map((artist) => (
            <article className="artist-card" key={artist.id}>
              <div className="artist-image-wrapper" data-cursor-hover>
                <img 
                  src={artist.image} 
                  alt={`Portrait of ${artist.name}, ${artist.role} at AURELÉ`} 
                  className="artist-image" 
                  loading="lazy" 
                />
              </div>
              <div className="artist-info">
                <h3 className="artist-name serif">{artist.name}</h3>
                <p className="artist-role uppercase">{artist.role}</p>
                <p className="artist-experience uppercase">{artist.experience}</p>
                <p className="artist-bio">{artist.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
