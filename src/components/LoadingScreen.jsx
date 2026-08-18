import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoaded }) => {
  const screenRef = useRef();
  const lineRef   = useRef();
  const brandRef  = useRef();

  // Entry animation on mount
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(brandRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut',
    }, '-=0.4');
  }, []);

  // Exit animation when content is ready
  useEffect(() => {
    if (!isLoaded) return;
    gsap.to(screenRef.current, {
      opacity: 0,
      duration: 0.9,
      delay: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {
        if (screenRef.current) screenRef.current.style.display = 'none';
      },
    });
  }, [isLoaded]);

  return (
    <div className="loading-screen" ref={screenRef} aria-hidden="true">
      <div className="loading-content">
        <h1 className="loading-brand" ref={brandRef}>AURELÉ</h1>
        <div className="loading-track">
          <div className="loading-line" ref={lineRef} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
