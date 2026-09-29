import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

import './Hero.css';

const Hero = () => {
  const sectionRef      = useRef();
  const contentRef      = useRef();
  const titleRef        = useRef();
  const taglineRef      = useRef();
  const ctaRef          = useRef();

  // ── Hero entrance animations (after loading screen) ──────
  useEffect(() => {
    const delay = 2.6; // sync with LoadingScreen exit

    const tl = gsap.timeline({ delay });

    // Clip-path reveal for title words
    tl.from(titleRef.current, {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.out',
    });

    tl.from(taglineRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.7');

    tl.from(ctaRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.7');

    return () => tl.kill();
  }, []);



  return (
    <section className="hero-section" id="hero" ref={sectionRef}>

      {/* Sticky viewport — holds both canvas and text */}
      <div className="hero-sticky">

        {/* Background Video */}
        <div className="hero-video-wrapper">
          <video 
            src={`${import.meta.env.BASE_URL}hero.mp4`} 
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </div>



        {/* Text content overlay */}
        <div className="hero-content" ref={contentRef}>
          <div className="hero-eyebrow uppercase">
            Hair · Skin · Beauty · Wellness
          </div>

          <div className="hero-title-wrap" aria-label="AURELÉ">
            <h1 className="hero-title" ref={titleRef}>
              AURELÉ
            </h1>
          </div>

          <p className="hero-tagline uppercase" ref={taglineRef}>
            Beauty, in motion.
          </p>

          <div className="hero-cta-group" ref={ctaRef}>
            <a href="#booking" className="btn-primary">
              <span>Book Your Experience</span>
            </a>
          </div>

          <div className="hero-scroll-hint" aria-hidden="true">
            <span className="scroll-label uppercase">Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
