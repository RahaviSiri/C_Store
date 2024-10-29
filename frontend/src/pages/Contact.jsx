import React, { useState } from 'react';
import Title from '../components/Title';
import Axios from 'axios';
import { assets } from '../../public/assets/assets';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found. Redirecting to login...');
        navigate('/Login');
        return;
      }
  
      const res = await Axios.post('http://localhost:3001/contact', {
        token: token,
        subject: subject,
        message: message,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      setResponse(res.data.message); 
      if (res.status === 200) {
        setName('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('Failed to send message. Please try again.');
    } finally {
      setLoading(false); 
    }
  };  

  return (
    <div className='container mx-auto px-4'>
      {/* Title Section */}
      <div className='text-center text-4xl font-bold pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Image */}
      <div className='flex flex-col justify-center items-center mb-6'> 
        <img 
              className="w-full md:w-1/2 m-5 rounded"
              src={assets.ContactUs} 
              alt="Contact Us Background" 
        />
      </div>

      {/* Contact Information & Form */}
      <div className='my-10 flex flex-col md:flex-row justify-between gap-10'>
        {/* Left Side: Contact Information */}
        <div className='relative w-full md:w-1/2 p-6 md:p-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg shadow-lg shadow-black overflow-hidden'>
          <div className='flex flex-col gap-4 items-center text-center'>
            <p className='font-bold text-xl md:text-3xl text-white'>Our Store</p>
            <p className='text-base md:text-lg font-semibold text-white'>
              <i className="fa-solid fa-location-dot"></i> 2536/2, Welawathe, Colombo-6
            </p>
            <p className='text-base md:text-lg font-semibold text-white'>
              <i className="fa-solid fa-phone"></i> Tel: 077 0890 678
            </p>
            <p className='text-base md:text-lg font-semibold text-white'>
              <i className="fa-solid fa-envelope"></i> Email: fgfzsgfsga@gmail.com
            </p>
            <p className='text-base md:text-lg font-semibold text-white'>
              <i className="fa-solid fa-lightbulb"></i> Careers at Forever
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className='bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg shadow-black w-full md:w-2/3'>
          <h3 className='text-2xl font-semibold mb-4 text-center'>Get in Touch</h3>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <input 
              type='text' 
              placeholder='Your Name' 
              className='p-3 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              type='text' 
              placeholder='Subject' 
              className='p-3 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea 
              placeholder='Your Message' 
              className='p-3 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500 h-32'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button 
              type='submit' 
              className='bg-pink-600 text-white py-3 rounded-md hover:bg-pink-800 transition duration-200'
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {response && <p className="mt-4 text-center text-green-500">{response}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
