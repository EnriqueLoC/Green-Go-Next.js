import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Home = () => {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.pageYOffset);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='styled-home'>
            <section className='parallax-container'>
                <div className='parallax' style={{ transform: `translateY(${offsetY * 0.125}px)` }}>
                    <h1 className='mainTitle' style={{ transform: `translateY(${offsetY * 0.175}px)` }}>Green Go</h1>
                    <div className='footer-hero'>
                        {/* Aquí va tu contenido */}
                    </div>
                    <div className='gradient' />
                </div>
            </section>

            <section className='activities'>
                <div className='grid'>
                    <div className='item'>
                        <Image src="/assets/Bag.jpg" alt="activity" width={500} height={500} />
                        <h3>A better</h3>
                    </div>
                    <div className='item'>
                        <Image src="/assets/FBT.jpg" alt="activity" width={500} height={500} />
                        <h3>Tomorrow</h3>
                    </div>
                    <div className='item'>
                        <Image src="/assets/Sus.jpg" alt="activity" width={500} height={500} />
                        <h3>For</h3>
                    </div>
                    <div className='item'>
                        <Image src="/assets/FDC.jpg" alt="activity" width={500} height={500} />
                        <h3>The World</h3>
                    </div>
                </div>
            </section>

            <section className='contact'>
                <p>
                    <span>Green Go ©</span>
                </p>
            </section>
        </div>
    );
}

export default Home;
