'use client';
import { projects } from '../models/couponsData';
import Card from '../components/Card';
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import backgroundImage from '../../public/assets/Bki.jpg';
import Navbar from '../components/Navbar';

export default function Coupons() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
return (
  <main
    ref={container}
    className='mainCoupons'
    style={{
      backgroundImage: `url(${backgroundImage.src})`
    }}
  >
    <Navbar/>
    {projects.map((project, i) => {
      const targetScale = 1 - (projects.length - i) * 0.05;
      return (
        <Card
          key={`p_${i}`}
          i={i}
          {...project}
          progress={scrollYProgress}
          range={[i * 0.25, 1]}
          targetScale={targetScale}
        />
      );
    })}
  </main>
);
}
