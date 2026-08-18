import React, { useRef, useEffect } from 'react';
import { Canvas }      from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import gsap            from 'gsap';
import ScrollTrigger   from 'gsap/ScrollTrigger';
import BeautyBottle    from './3d/BeautyBottle';
import './Hero.css';

const Hero = () => {
  const sectionRef      = useRef();
  const contentRef      = useRef();
  const titleRef        = useRef();
  const taglineRef      = useRef();
  const servicesRef     = useRef();
  const ctaRef          = useRef();
  const scrollProgress  = useRef(0);  // Shared with BeautyBottle via prop

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

    tl.from(servicesRef.current, {
      opacity: 0,
      y: 15,
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

  // ── Connect scroll progress to bottle via shared ref ─────
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    // Fade hero content text as user scrolls into 3D story
    const contentFade = gsap.to(contentRef.current, {
      opacity: 0,
      y: -30,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '25% top',
        scrub: 1,
      },
    });

    return () => {
      trigger.kill();
      contentFade.kill();
    };
  }, []);

  return (
    <section className="hero-section" id="hero" ref={sectionRef}>

      {/* Sticky viewport — holds both canvas and text */}
      <div className="hero-sticky">

        {/* 3D Canvas — sits behind text */}
        <div className="hero-canvas-wrapper" aria-hidden="true">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.5, 7], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.6} />

            {/* Key light */}
            <directionalLight
              position={[4, 8, 5]}
              intensity={2.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.001}
            />

            {/* Rim light */}
            <spotLight
              position={[-5, 6, -4]}
              intensity={2}
              angle={0.4}
              penumbra={0.8}
              color="#f5ede0"
            />

            {/* Fill light */}
            <pointLight position={[0, -3, 4]} intensity={0.8} color="#fffaf5" />

            <React.Suspense fallback={null}>
              <BeautyBottle scrollProgress={scrollProgress} />
              <Environment preset="studio" />
            </React.Suspense>
          </Canvas>
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
