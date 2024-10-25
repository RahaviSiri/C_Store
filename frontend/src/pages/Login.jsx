import React, { useState } from 'react';
import Axios from 'axios';

const Login = () => {
  //const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentState, setCurrentState] = useState('Login');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login or signup logic here
    if (currentState === 'Sign up' && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    else if(currentState === 'Sign up' && validatePassword(password)){
      //Ok proceed sign up..
      const signup_response = await Axios.post("http://localhost:3001/signup",
        {
          firstname:firstname,
          lastname:lastname,
          email:email,
          password:password
        }
      );
      if (signup_response.data.token != 'User with this email already exists'){
        console.log("success!");
        console.log(signup_response);

        // Extract the token from response data
        const token = signup_response.data.token;
        
        // Optionally, store the token in localStorage or sessionStorage
        localStorage.setItem('token', token);  // Or sessionStorage.setItem('token', token);
        
        console.log("Token stored successfully:", token);
        
        // Redirect to another page or do further actions
        window.location.href = "/";
        // return;
      }
      else{
        alert('User with this email already exists')
      };

    }
    else if(currentState === 'Login'){
      try {
        const login_response = await Axios.post("http://localhost:3001/login", {
            email: email,
            password: password
        });
        
        // Access the response data from the promise
        if (login_response) {
          console.log('Login ok!');
          console.log(login_response); // Assuming you want to log the response data

              // Extract the token from response data
          const token = login_response.data.token;
          
          // Optionally, store the token in localStorage or sessionStorage
          localStorage.setItem('token', token);  // Or sessionStorage.setItem('token', token);
          console.log("Token stored successfully:", token);
          window.location.href = "/";
        }
      } 
      catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength || !hasNumber.test(password) || !hasUpperCase.test(password) || !hasLowerCase.test(password) || !hasSpecialChar.test(password)) {
      alert('Password must be at least 8 characters long.\nmust contain,\n :at least one number.\n :at least one uppercase letter.\n :at least one lowercase letter.\n :at least one special character.');
      return false;
    }
    else{
      return true;
    }
  };

  return (
    <div className="flex flex-col sm:gap-7 lg:gap-2 lg:flex-row justify-center items-center  min-h-screen" style={{ backgroundImage: 'url("public/assets/Login_bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Left Side - Welcome Text */}
      <div className="text-center lg:text-left text-white mx-3 flex flex-col justify-center" >
        <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold mb-4">Welcome to <br/> C-Store</h1>
        <p className="text-2xl sm:text-2xl">Your Local retailer is now Online!</p>
      </div>

      {/* Right Side - Form */}
      <form onSubmit={(e) => handleLogin(e)} className="bg-white shadow-2xl rounded-2xl p-8 sm:w-2/3 lg:w-1/2 m-5">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-700">{currentState}</h2>
        {currentState === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Firstname</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your Firstname"
              required
            />
          </div>
        )}

{currentState === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Lastname</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your Lastname"
              required
            />
          </div>
        )}



        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {currentState === 'Sign up' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        <div className="mb-8 text-right">
          {currentState === 'Login' ? (
            <p className="text-sm text-gray-600">
              New here? <span className="text-indigo-500 cursor-pointer" onClick={() => setCurrentState('Sign up')}>Sign up</span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account? <span className="text-indigo-500 cursor-pointer" onClick={() => setCurrentState('Login')}>Login</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition duration-300"
        >
          {currentState === 'Login' ? 'Login' : 'Sign up'}
        </button>
      </form>
    </div>
  );
};

export default Login;