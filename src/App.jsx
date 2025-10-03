// import React, { useEffect, useRef } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
// import 'locomotive-scroll/dist/locomotive-scroll.css';
// import Navbar from './Components/Navbar/Navbar/Navbar';
// import Hero from './Components/Hero/Hero';
// import TechSkills from './Components/TechSkills/Skills';
// import WorkExperience from './Components/WorkExperience/WorkExperience';
// import Footer from './Components/Footer/Footer';
// import Projects from './Components/Projects/Projects';
// import './App.css';

// function App() {
//   const scrollRef = useRef(null);
//   const scrollInstance = useRef(null);

//   useEffect(() => {
//     if (!scrollRef.current) return;

//     const scroll = new LocomotiveScroll({
//       el: scrollRef.current,
//       smooth: true,
//     });

//     scrollInstance.current = scroll;

//     // Optional: Add visibility class for animations
//     scroll.on('scroll', (args) => {
//       const sections = scrollRef.current.querySelectorAll('.scroll-animate');
//       sections.forEach((el) => {
//         const rect = el.getBoundingClientRect();
//         if (rect.top < window.innerHeight * 0.8) {
//           el.classList.add('visible');
//         }
//       });
//     });

//     return () => {
//       scroll.destroy();
//     };
//   }, []);

//   return (
//     <div 
//       ref={scrollRef} 
//       data-scroll-container
//       style={{
//         width: '100%',
//         overflowX: 'hidden'
//       }}
//     >
//       <Navbar />
//       <Hero />
//       <TechSkills />
//       <WorkExperience />
//       <Projects />
//       <Footer />
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LocomotiveScroll from 'locomotive-scroll';
// import 'locomotive-scroll/dist/locomotive-scroll.css';
// import Navbar from './Components/Navbar/Navbar/Navbar';
// import Hero from './Components/Hero/Hero';
// import TechSkills from './Components/TechSkills/Skills';
// import WorkExperience from './Components/WorkExperience/WorkExperience';
// import Footer from './Components/Footer/Footer';
// import Projects from './Components/Projects/Projects';
// import Login from './Auth & Admin/login';
// import './App.css';

// function MainPage() {
//   const scrollRef = useRef(null);
//   const scrollInstance = useRef(null);

//   useEffect(() => {
//     if (!scrollRef.current) return;
    
//     const scroll = new LocomotiveScroll({
//       el: scrollRef.current,
//       smooth: true,
//     });
    
//     scrollInstance.current = scroll;

//     // Optional: Add visibility class for animations
//     scroll.on('scroll', (args) => {
//       const sections = scrollRef.current.querySelectorAll('.scroll-animate');
//       sections.forEach((el) => {
//         const rect = el.getBoundingClientRect();
//         if (rect.top < window.innerHeight * 0.8) {
//           el.classList.add('visible');
//         }
//       });
//     });

//     return () => {
//       scroll.destroy();
//     };
//   }, []);

//   return (
//     <div
//       ref={scrollRef}
//       data-scroll-container
//       style={{
//         width: '100%',
//         overflowX: 'hidden'
//       }}
//     >
//       <Navbar />
//       <Hero />
//       <TechSkills />
//       <WorkExperience />
//       <Projects />
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Navbar from './Components/Navbar/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import TechSkills from './Components/TechSkills/Skills';
import WorkExperience from './Components/WorkExperience/WorkExperience';
import Footer from './Components/Footer/Footer';
import Projects from './Components/Projects/Projects';
import Login from './Auth & Admin/login';
import Dashboard from './Auth & Admin/dashboard';
import './App.css';

function MainPage() {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
      lerp: 0.1,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });
    
    scrollInstance.current = scroll;

    // Function to update scroll
    const updateScroll = () => {
      if (scrollInstance.current) {
        setTimeout(() => {
          scrollInstance.current.update();
        }, 100);
      }
    };

    // Update when images load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', updateScroll);
    });

    // Update on window resize
    window.addEventListener('resize', updateScroll);

    // Listen for custom event when Firebase data loads
    const handleDataLoaded = () => {
      updateScroll();
    };

    window.addEventListener('firebaseDataLoaded', handleDataLoaded);

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', updateScroll);
      });
      window.removeEventListener('resize', updateScroll);
      window.removeEventListener('firebaseDataLoaded', handleDataLoaded);
      scroll.destroy();
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      style={{
        width: '100%',
        minHeight: '100vh'
      }}
    >
      <Navbar />
      <Hero />
      <TechSkills />
      <WorkExperience />
      <Projects />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;