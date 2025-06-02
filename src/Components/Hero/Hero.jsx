import React, { useEffect, useRef } from 'react';
import { useTypewriter } from './Typewriter'; // adjust the path as needed
import './Hero.css';
// import me2 from '../../Assets/me2.png';
import me3 from '../../Assets/me/me3.jpeg';

const emojis = ['🎹', '🖥️', '🎶', '🎧', '💻', '🎼', '🧑‍💻', '⌨️'];

function Hero() {
  const heroContentRef = useRef(null);

  const fullText = [
 "I’m a Full-Stack Developer with a degree in Computer Science and a passion for building smart, efficient digital solutions. I enjoy creating seamless web and mobile experiences using modern tools and frameworks.",
"I’m also a graduate pianist with a minor in music composition.",
"Both of my skills — music and code — come from keyboards. One sings, one builds.",
"Thanks for visiting!",
  ];

  const typedText = useTypewriter(fullText, 30, 1000);

  useEffect(() => {
    const heroContent = heroContentRef.current;
    const emojiCount = 8;
    const contentBounds = heroContent.getBoundingClientRect();

    const safeZone = {
      left: 20,
      top: 20,
      right: contentBounds.width - 20,
      bottom: contentBounds.height - 20
    };

    const getRandomPosition = () => {
      const x = safeZone.left + Math.random() * (safeZone.right - safeZone.left);
      const y = safeZone.top + Math.random() * (safeZone.bottom - safeZone.top);
      return { x, y };
    };

    const doesOverlap = (position, positions) => {
      return positions.some((pos) => {
        const distance = Math.sqrt(Math.pow(pos.x - position.x, 2) + Math.pow(pos.y - position.y, 2));
        return distance < 50;
      });
    };

    const positions = [];

    for (let i = 0; i < emojiCount; i++) {
      let position;
      do {
        position = getRandomPosition();
      } while (doesOverlap(position, positions));

      positions.push(position);

      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const emojiElement = document.createElement('span');
      emojiElement.textContent = emoji;
      emojiElement.classList.add('floating-emoji');
      emojiElement.style.left = `${position.x}px`;
      emojiElement.style.top = `${position.y}px`;
      heroContent.appendChild(emojiElement);
    }
  }, []);

  return (
    <section className='hero-container'>
      <div className='hero-content' ref={heroContentRef}>
        <h2>
          Hi, I’m Antoun! <span className="wave-emoji">👋</span>
        </h2>
        <p style={{ whiteSpace: 'pre-line' }}>{typedText}</p>
      </div>

      <div className='hero-img'>
        <img src={me3} alt='Antoun Atallah' />
      </div>
    </section>
  );
}

export default Hero;