import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef();
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    // Do nothing on touch-primary devices
    if (window.matchMedia('(hover: none)').matches) return;

    const el = cursorRef.current;

    const onMove = (e) => {
      if (!visible) setVisible(true);
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power3.out',
        overwrite: true,
      });

      // Detect if cursor is over a dark background section
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target) {
        const isDark = target.closest(
          '.brand-story-section, .footer-section, .booking-dark'
        );
        setOnDark(!!isDark);
      }
    };

    const onEnterInteractive = () => el.classList.add('hovering');
    const onLeaveInteractive = () => el.classList.remove('hovering');

    document.addEventListener('mousemove', onMove);

    // Use event delegation for interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        onEnterInteractive();
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        onLeaveInteractive();
      }
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
    };
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      className={`cursor ${visible ? 'visible' : ''} ${onDark ? 'on-dark' : ''}`}
      aria-hidden="true"
    />
  );
};

export default Cursor;
