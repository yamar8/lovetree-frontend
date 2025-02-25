import React, { useContext, useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Google Login Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode the Google credential
      const decoded = jwtDecode(credentialResponse.credential);
      
      // Send the Google token to your backend
      const response = await axios.post(backendUrl + '/api/user/google-login', {
        token: credentialResponse.credential,
        email: decoded.email,
        name: decoded.name
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed');
    }
  };

  // Google Login Failure Handler
  const handleGoogleFailure = () => {
    toast.error('Google login failed. Please try again.');
  };

  // Regular Form Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up' && !showVerification) {
        // First step: Registration - send verification code
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        });

        if (response.data.success) {
          setShowVerification(true);
          setTempEmail(email);
          toast.success('Verification code sent to your email');
        }
      } else if (currentState === 'Sign Up' && showVerification) {
        // Second step: Verify code
        const response = await axios.post(backendUrl + '/api/user/verify', {
          email: tempEmail,
          code: verificationCode
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      } else {
      const response = await axios.post(backendUrl + `/api/user/login`, {
        name,
        email,
        password
      });
    
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }}
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {currentState === 'Login' ? '' : (
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          type="text" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' 
          required
        />
      )}
      
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required
      />
      
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required
      />
  
      {/* Add Verification Code Input Here */}
      {currentState === 'Sign Up' && showVerification && (
        <input
          onChange={(e) => setVerificationCode(e.target.value)}
          value={verificationCode}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Verification Code'
          required
        />
      )}
  
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Login Here
          </p>
        )}
      </div>
  
      {/* Update the Submit Button Here */}
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 
         showVerification ? 'Verify Code' : 'Sign Up'}
      </button>
  
      <div className="w-full flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600">Or continue with</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
        />
      </div>
    </form>
  );
};

export default Login;