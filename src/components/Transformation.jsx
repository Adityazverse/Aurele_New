import React, { useState, useRef, useEffect } from 'react';
import './Transformation.css';

const Transformation = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <section className="transformation-section" id="transformation">
      <div className="container">
        <div className="transformation-header text-center">
          <h2 className="section-title serif">The Aurelé Transformation</h2>
          <p className="section-subtitle uppercase">Before & After</p>
        </div>

        <div 
          className="slider-container"
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* After Image (Base) */}
          <div className="slider-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop" 
              alt="After transformation" 
              className="slider-image" 
              draggable="false"
            />
            <span className="slider-label label-after uppercase">After</span>
          </div>

          {/* Before Image (Overlay) */}
          <div 
            className="slider-overlay" 
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=1200&auto=format&fit=crop" 
              alt="Before transformation" 
              className="slider-image" 
              draggable="false"
            />
            <span className="slider-label label-before uppercase">Before</span>
          </div>

          {/* Draggable Divider */}
          <div 
            className="slider-divider" 
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="slider-handle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l6-6-6-6" />
                <path d="M9 18l-6-6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformation;
