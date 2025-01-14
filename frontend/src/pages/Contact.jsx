// import React from 'react';
import '../css/Contact.css'; // Assuming you'll add the styling in a separate CSS file
import { Textarea } from '@/components/ui/textarea';

export const Contact = () => {
  return (
    <div className="contact-section">
        
      <div className="contact-container">
      <h1 className='contact-heading'>Contact Us</h1>
        
        {/* Form Section */}
        <div className="form-section">
          <form>
            <div className="form-group">
              <input className="input-field" type="text" placeholder="  Your Name" required />
            </div>
            <div className="form-group">
              <input className="input-field" type="email" placeholder="  Your Email" required />
            </div>
            <div className="form-group">
              <input className="input-field" type="text" placeholder="  Your Subject" required />
            </div>
            <div className="form-group">
              {/* <textarea placeholder="Your Message" rows="4" required></textarea> */}
              <Textarea className="text-area" placeholder="Your Message" rows="4" required/>
            </div>
            <button type="submit" className="send-btn">Send Message</button>
          </form>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.137609993317!2d115.1775!3d-8.7288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24c72a0c9bfab%3A0x5057f6f4b10c51bc!2sJl.%20Raya%20Kuta%20No.70%2C%20Kuta%2C%20Kec.%20Kuta%2C%20Kabupaten%20Badung%2C%20Bali%2080361%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1603348026475!5m2!1sen!2sid"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
};


