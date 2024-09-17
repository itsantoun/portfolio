import React from 'react'
import './Hero.css'
import me2 from '../../Assets/me2.png'

function Hero() {
  return (
  <section className='hero-container'>
<div className='hero-content'>
<h2>Welcome to my Portfolio</h2>
<p>
Hello! I'm Antoun Atallah, a 23 year-old Computer Science major with a keen interest in web development, mobile, and cloud computing. In addition to my technical pursuits, I am also majoring in piano and minoring in music composition. </p>
</div>

<div className='hero-img'>
<div>
<img src={me2} alt=''/>
</div>
</div>

<div>
</div>

  </section>
  )
}

export default Hero