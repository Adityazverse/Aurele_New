import React, { useState } from 'react';
import './Booking.css';

const Booking = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section className="booking-section booking-dark" id="booking">
      <div className="container">
        <div className="booking-wrapper">
          
          <div className="booking-content text-center">
            <p className="section-eyebrow">Reservations</p>
            <h2 className="section-title serif text-light">Begin Your Transformation</h2>
          </div>
          
          {!isSubmitted ? (
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <select required defaultValue="" className="form-input">
                    <option value="" disabled hidden></option>
                    <option value="hair">Hair Styling & Cut</option>
                    <option value="color">Color & Balayage</option>
                    <option value="skin">Skin & Facial</option>
                    <option value="makeup">Makeup Artistry</option>
                    <option value="bridal">Bridal Consultation</option>
                  </select>
                  <label className="form-label uppercase">Select Service</label>
                  <div className="select-arrow" />
                </div>
                
                <div className="form-group">
                  <input type="date" required className="form-input" />
                  <label className="form-label uppercase">Preferred Date</label>
                </div>
                
                <div className="form-group">
                  <select required defaultValue="" className="form-input">
                    <option value="" disabled hidden></option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (4PM - 8PM)</option>
                  </select>
                  <label className="form-label uppercase">Preferred Time</label>
                  <div className="select-arrow" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input type="text" required className="form-input" placeholder=" " />
                  <label className="form-label uppercase">Full Name</label>
                </div>
                <div className="form-group">
                  <input type="tel" required className="form-input" placeholder=" " />
                  <label className="form-label uppercase">Phone Number</label>
                </div>
                <div className="form-group">
                  <input type="email" required className="form-input" placeholder=" " />
                  <label className="form-label uppercase">Email Address</label>
                </div>
              </div>
              
              <div className="form-submit text-center">
                <button type="submit" className="btn-primary" data-cursor-hover>
                  <span>Request Appointment</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="booking-success text-center">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="serif text-light">Request Received</h3>
              <p className="text-muted">
                Our concierge will contact you shortly to confirm your appointment details.
              </p>
              <button onClick={() => setIsSubmitted(false)} className="btn-outline mt-md" data-cursor-hover>
                Make another request
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Booking;
