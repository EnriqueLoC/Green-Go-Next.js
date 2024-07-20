import React, { useState } from 'react';
import { Equals, X } from 'phosphor-react';
import Menu from './Menu';
import Link from 'next/link';

export default function Navbar({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className='styled-navbar'>
        <span onClick={toggle}>
          {!isOpen ? <Equals size={25} /> : <X size={25} />}
        </span>
        <Link href={!session ? "/Login" : "/profile"}>
          <button>
            {!session ? 'Login' : 'Profile'}
          </button>
        </Link>
      </nav>
      <Menu isOpen={isOpen} />
    </>
  );
}
