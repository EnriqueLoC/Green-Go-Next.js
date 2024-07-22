// ProfileCard.js
'use client';

import React from 'react';
import favicon from '../../../public/assets/favicon-32x32.png';
import avatar from '../../../public/assets/avatar.png';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProfileCard = ({ onChangeView }) => {
  const session = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevents NextAuth.js from redirecting
    router.push('/'); // Redirects to home page
  };

  return (
    <div>
      {/* <div className="blur-overlay"></div> */}
      <main className='bodyProfile'>
        <button className='back-home-button'>
          <Link href="/">
            {"< Go Back"}
          </Link>          
        </button>
        <div className="containerProfile">
          <div className="cardProfile">
            <section className="imgProfile">
              <div className="patternProfile"></div>
              <img className="avatarProfile" src={session ? session.data?.user?.image : `${avatar.src}`} alt="Avatar" />
              <button className='logoutBtn' onClick={handleLogout}>
                Logout
              </button>
            </section>
            <section className="userinfo">
              <h1>{session?.data?.user?.name}</h1>
              <button className='settingsBtn' onClick={onChangeView}>
                <i className="fi fi-rr-settings"></i>
              </button>
            </section>
            <section className="userstat">
              <div>
                <h1>803K</h1>
                <p>Points</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileCard;
