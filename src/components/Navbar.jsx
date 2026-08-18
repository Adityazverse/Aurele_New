import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about'    },
  { label: 'Artists',  href: '#artists'  },
  { label: 'Gallery',  href: '#gallery'  },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navRef = useRef();

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mount entrance animation
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 1.2,
      delay: 2.6, // After loading screen exits
      ease: 'power3.out',
    });
  }, []);

  // Close menu on link click
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-inner container">
        {/* Brand */}
        <a href="#hero" className="navbar-brand" aria-label="AURELÉ home">
          AURELÉ
        </a>

        {/* Desktop nav links */}
        <ul className="navbar-links" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="navbar-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Book CTA + Hamburger */}
        <div className="navbar-actions">
          <a href="#booking" className="navbar-cta">
            <span>Book Now</span>
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="bar bar--top" />
            <span className="bar bar--mid" />
            <span className="bar bar--bot" />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen overlay */}
      <div className="mobile-menu" aria-hidden={!menuOpen}>
        <ul className="mobile-links" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="mobile-link"
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#booking" className="mobile-link mobile-link--cta" onClick={handleNavClick}>
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
