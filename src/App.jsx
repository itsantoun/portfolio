import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Components/Navbar/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Skills from './Components/Skills/Skills';
import WorkExperience from './Components/WorkExperience/WorkExperience';
import Footer from './Components/Footer/Footer';
import Contact from './Components/Contact Me/Contact';
import Projects from './Components/Projects/Projects';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <motion.div 
        className='container'
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Hero id='homePage' />
        <Skills id='Skills' />
        <Projects id='Projects' />
        <WorkExperience id='WorkExperience' />
        <Contact id='contact' />
      </motion.div>
      <Footer id='footer' />
    </div>
  );
}

export default App;
