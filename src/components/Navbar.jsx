import React, { useState } from 'react';
import { Equals, X } from 'phosphor-react';
import Menu from './Menu';
import Link from 'next/link';
import { useSession } from 'next-auth/react'; // Importa el hook useSession

export default function Navbar() {
  const { data: session, status } = useSession(); // Usa useSession para obtener la sesión
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const buttonText = status === 'loading' ? 'Loading...' : session ? 'Profile' : 'Login';

  return (
    <>
      <nav className='styled-navbar'>
        <span onClick={toggle}>
          {!isOpen ? <Equals size={25} /> : <X size={25} />}
        </span>
        <Link href={!session ? "/Login" : "/profile"}>
          <button>
            {buttonText}
          </button>
        </Link>
      </nav>
      <Menu isOpen={isOpen} />
    </>
  );
}
