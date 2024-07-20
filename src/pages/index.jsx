import React from 'react';
import Navbar from '../components/Navbar';
import Home from './Home';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../src/pages/api/auth/[...nextauth]';

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
  
    return {
      props: {
        session,
      },
    };
  }

const Index = ({ session }) => {
    return (
        <>
            <Navbar session={session}/>
            <Home />
        </>
    );
};

export default Index;