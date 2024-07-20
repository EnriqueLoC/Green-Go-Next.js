'use client';

import React from 'react'

const links = [
    { id: 1, name: 'Home', path: '/'},
    { id: 2, name: 'Map', path: '/Map'},
    { id: 3, name: 'Coupons', path: '/Coupons'},
    { id: 4, name: 'About Us', path: '/AboutUs'}
]

const Menu = ({ isOpen }) => {

    const handleMenuClick = (path) => {
        window.location.href = path; // Or use history.pushState
      };

      return (
        <div className={isOpen ? 'styled-menu menu-open' : 'styled-menu'}>
          <ul className='links'>
            {links.map((link) => (
              <li key={link.id}>
                <span onClick={() => handleMenuClick(link.path)}>
                  {link.name}
                </span>
              </li>
            ))}
          </ul>
          <div className='social'>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Linkedin</p>
          </div>
        </div>
      );
};

export default Menu