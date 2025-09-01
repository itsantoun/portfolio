import React from 'react';
import { useTypewriter } from './Typewriter'; // adjust the path as needed
import './Hero.css';
import me3 from '../../Assets/me/me4.jpeg';

function Hero() {
  const fullText = [
    "I'm a Full-Stack Developer with a degree in Computer Science and a passion for building smart, efficient digital solutions.",
    "I enjoy creating seamless web and mobile experiences using modern tools and frameworks.",
    "I'm also a graduate pianist with a minor in music composition.",
    "Both of my skills — music and code — come from keyboards. One sings, one builds.",
    "Thanks for visiting!"
  ];

  const typedText = useTypewriter(fullText, 30, 1000);

  return (
    <section id="Hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-image-container">
            <img src={me3} alt="Antoun" className="hero-image" />
          </div>
          
          <div className="hero-text">
            <div className="header-container">
              <h1>Hi, I'm Antoun! 👋</h1>
            </div>
            
            <div className="hero-tagline">
              <h2>Developer & Musician</h2>
            </div>
            
            <div className="typewriter-container">
              <p>{typedText}</p>
              <span className="cursor">|</span>
            </div>
            
            {/* <div className="hero-buttons">
              <button className="toggle-button">View My Work</button>
              <button className="toggle-button">Get In Touch</button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;