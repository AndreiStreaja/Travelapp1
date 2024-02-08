
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch('http://localhost:5000/register', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      result = await result.json();

      if (result) {
        setErrorMessage('');
        alert('Registration successful');
        setEmail('');
        setPassword('');
        navigate('/');
        localStorage.setItem('userEmail', email);
      }
    } catch (error) {
      setErrorMessage(
        'The email is already in use. Please choose another email.'
      );
    }
  };

  return (
    <section className="vh-100 bg-gray-200">
      <div className="container h-100 mx-auto flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-5 text-center">Sign up</h1>
          <form className="space-y-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="text-red-500">{errorMessage}</div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
