import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo serif">AURELÉ</h2>
            <p className="footer-tagline uppercase">Beauty, in motion.</p>
          </div>
          
          <div className="footer-nav-col">
            <h4 className="footer-heading uppercase">Explore</h4>
            <ul role="list">
              <li><a href="#services" data-cursor-hover>Services</a></li>
              <li><a href="#artists" data-cursor-hover>The Collective</a></li>
              <li><a href="#gallery" data-cursor-hover>Aesthetic</a></li>
              <li><a href="#booking" data-cursor-hover>Reservations</a></li>
            </ul>
          </div>
          
          <div className="footer-nav-col">
            <h4 className="footer-heading uppercase">Visit Us</h4>
            <address className="footer-address">
              <p>123 Luxury Avenue</p>
              <p>Mumbai, MH 400001</p>
              <p className="footer-email">
                <a href="mailto:hello@aurele.studio" data-cursor-hover>hello@aurele.studio</a>
              </p>
            </address>
          </div>
          
          <div className="footer-nav-col">
            <h4 className="footer-heading uppercase">Connect</h4>
            <ul role="list">
              <li><a href="#" data-cursor-hover>Instagram</a></li>
              <li><a href="#" data-cursor-hover>TikTok</a></li>
              <li><a href="#" data-cursor-hover>Pinterest</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AURELÉ Studio. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" data-cursor-hover>Privacy Policy</a>
            <a href="#" data-cursor-hover>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
