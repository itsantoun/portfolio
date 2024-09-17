import React from 'react';
import Navbar from './Components/Navbar/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import './App.css';
import Skills from './Components/Skills/Skills';
import WorkExperience from './Components/WorkExperience/WorkExperience';
import Footer from './Components/Footer/Footer';
import Contact from './Components/Contact Me/Contact';
import Projects from './Components/Projects/Projects';

function App() {
  return (
    <div>
    
      <Navbar />
      <div className='container'>
        <Hero id='homePage' />
        <Skills id='Skills' />
        <Projects id='Projects' />
        <WorkExperience id='WorkExperience' />
        <Contact id='contact' />
      </div>
      <Footer id='footer' />
    </div>
  );
}

export default App;
