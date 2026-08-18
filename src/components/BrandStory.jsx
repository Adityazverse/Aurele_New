import React, { useRef } from 'react';
import { useGSAP }       from '@gsap/react';
import gsap              from 'gsap';
import ScrollTrigger     from 'gsap/ScrollTrigger';
import './BrandStory.css';

const BrandStory = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Background parallax effect
    gsap.to('.brand-story-bg', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Quote reveal
    gsap.from('.story-statement', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.story-content',
        start: 'top 80%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="brand-story-section" id="about" ref={sectionRef}>
      {/* Parallax Background */}
      <div className="brand-story-bg-wrap" aria-hidden="true">
        <div 
          className="brand-story-bg" 
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2000&auto=format&fit=crop")' 
          }} 
        />
        <div className="brand-story-overlay" />
      </div>

      <div className="container relative-z">
        <div className="story-content text-center">
          <p className="story-label uppercase">The Philosophy</p>
          <h2 className="story-statement serif">
            “A space where beauty becomes ritual, craftsmanship becomes confidence, and every detail is designed around you.”
          </h2>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
