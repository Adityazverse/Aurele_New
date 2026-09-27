import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Transformation from './components/Transformation';
import Artists from './components/Artists';
import BrandStory from './components/BrandStory';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small grace period for fonts + first 3D render
    const timer = setTimeout(() => setIsLoaded(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  // ── Lenis smooth scrolling (v1 API) ─────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
      wheelMultiplier: 1.0,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      <LoadingScreen isLoaded={isLoaded} />
      <div className="app">
        <Navbar />
        <Hero />
        <Services />
        <Gallery />
        <Transformation />
        <Artists />
        <BrandStory />
        <Testimonials />
        <Booking />
        <Footer />
      </div>
    </>
  );
}

export default App;
