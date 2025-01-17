import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AiFillFacebook } from 'react-icons/ai';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import signupImg from '../../public/assets/trees.jpg';
import Image from 'next/image';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useRouter } from 'next/router'; // Importa useRouter

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter(); // Usa useRouter

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/Login'); // Redirige a la página de inicio de sesión
    } catch (error) {
      setError(error.message); // Muestra el error en el estado en lugar de usar alert
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    console.log({
      name,
      email,
      password,
    });

    signup().finally(() => {
      setIsLoading(false);
    });
  };

  const goHome = () =>{
    router.push('/');
  }

  return (
    <div className='relative w-full h-screen'>
      <Image className='absolute w-full h-full object-cover mix-blend-overlay z-0' src={signupImg} alt="Background" />
      
      <div className='flex justify-center items-center h-full relative z-10'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={handleSubmit} aria-labelledby="signupForm">
          <h2 
            id="signupForm" 
            className='text-4xl font-bold text-center py-4 cursor-pointer'
            onClick={goHome}>Green Go</h2>
          <div className='flex justify-between py-8'>
            <button type="button" className='outline outline-offset-2 outline-2 shadow-lg hover:shadow-xl px-6 py-2 flex items-center' aria-label="Sign up with Facebook">
              <AiFillFacebook className='mr-2' /> Facebook
            </button>
            <button type="button" className='outline outline-offset-2 outline-2 shadow-lg hover:shadow-xl px-6 py-2 flex items-center' aria-label="Sign up with Google">
              <FaGoogle className='mr-2' /> Google
            </button>
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className='border bg-gray-200 p-2'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className='border bg-gray-200 p-2'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor="password">Password</label>
            <div className='relative'>
              <input
                id="password"
                className='border bg-gray-200 p-2 w-full'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required="true"
              />
              <button
                type="button"
                className='absolute inset-y-0 right-0 px-4 text-gray-600'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className='relative'>
              <input
                id="confirmPassword"
                className='border bg-gray-200 p-2 w-full'
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-required="true"
              />
              <button
                type="button"
                className='absolute inset-y-0 right-0 px-4 text-gray-600'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          {error && <p className='text-red-600'>{error}</p>}
          <button 
            type="submit" 
            className='w-full py-3 mt-8 bg-emerald-500 hover:bg-emerald-800 shadow-lg shadow-green-500/50 transition-colors text-white' 
            disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p className='text-center mt-8'>
            Already a member? <Link href="/Login" className='text-green-500 hover:underline'>Sign in now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
