import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import Navbar from './Components/Navbar/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import TechSkills from './Components/TechSkills/Skills';
import WorkExperience from './Components/WorkExperience/WorkExperience';
import Footer from './Components/Footer/Footer';
import Projects from './Components/Projects/Projects';

import './App.css';

function App() {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    scrollInstance.current = scroll;

    // Optional: Add visibility class for animations
    scroll.on('scroll', (args) => {
      const sections = scrollRef.current.querySelectorAll('.scroll-animate');
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add('visible');
        }
      });
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef} className="container">
      <Navbar />
      <Hero
        id="homePage"
        className="scroll-animate fade-in"
      />
      <TechSkills
        className="scroll-animate slide-in-left"
      />
      <Projects
        id="Projects"
        className="scroll-animate slide-in-right"
      />
      <WorkExperience
        id="WorkExperience"
        className="scroll-animate fade-in"
      />
      <Footer id="footer" />
    </div>
  );
}

export default App;