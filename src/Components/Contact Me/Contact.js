import React from 'react';
import './Contact.css';
import ContactInfoCard from './ContactInfoCard/ContactInfoCard';

function Contact() {
  return (
    <section className='contact-container'>
      <h5>Contact Me</h5>

      <div className='contact-content'>
        <div style={{ flex: 1 }}>
          <ContactInfoCard 
            iconUrl={require('../../Assets/imgbin_envelope-mail-icon-png.png')}
            text='antoun.atallah@hotmail.com'
            link='mailto:antoun.atallah@hotmail.com'  // Add the link here
          />
        </div>

        <div style={{ flex: 1 }}>
          <ContactInfoCard 
            iconUrl={require('../../Assets/imgbin_linkedin-png.png')}
            text='https://www.linkedin.com/in/antoun-atallah'
            link='https://www.linkedin.com/in/antoun-atallah'  // Add the link here
          />
        </div>

        <div style={{ flex: 1 }}>
          <ContactInfoCard 
            iconUrl={require('../../Assets/sl_z_072523_61700_01.jpg')}
            text='Follow me on X'
            link='https://www.twitter.com/itsantoun'  // Add the link here
          />
        </div>

        

        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1 }}></div>
      </div>
    </section>
  );
}

export default Contact;
