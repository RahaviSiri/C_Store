import React from 'react';
import { assets } from '../../public/assets/assets';

const Footer = () => (
  <footer className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-6 md:p-10">
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 max-w-6xl mx-auto px-4">
      
      {/* Company Info */}
      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold underline">BEST E-COMMERCE PLATFORM</h3>
        <p className="mt-2 text-lg">Explore our wide range of products. <br />We offer the best prices and exclusive deals on the market.</p>
        <div className='flex justify-center md:justify-start items-center space-x-4 bg-white w-40 mt-3 mx-auto md:mx-0'>
          <img src={assets.Storelogo} className='w-32 md:w-40' alt="Store Logo" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col space-y-2 md:space-y-4 text-center md:text-left">
        <p className='text-xl font-semibold underline mb-2'>INFORMATION</p>
        <a href="/" className="text-lg hover:text-purple-300 flex items-center  md:justify-start space-x-2"><i className="fa fa-star" aria-hidden="true"></i><span>Home</span></a>
        <a href="/About_us" className="text-lg hover:text-purple-300 flex items-center  md:justify-start space-x-2"><i className="fa fa-star" aria-hidden="true"></i><span>About Us</span></a>
        <a href="/ProductCategory" className="text-lg hover:text-purple-300 flex items-center md:justify-start space-x-2"><i className="fa fa-star" aria-hidden="true"></i><span>Products</span></a>
        <a href="/contact" className="text-lg hover:text-purple-300 flex items-center md:justify-start space-x-2"><i className="fa fa-star" aria-hidden="true"></i><span>Contact Us</span></a>
        <a href="/privacy" className="text-lg hover:text-purple-300 flex items-center md:justify-start space-x-2"><i className="fa fa-star" aria-hidden="true"></i><span>Privacy Policy</span></a>
        <a href="/terms" className="text-lg hover:text-purple-300 flex items-center  md:justify-start space-x-2"><i className="fa fa-star" aria-hidden="true"></i><span>Terms & Conditions</span></a>
      </div>

      {/* Contact Info */}
      <div className="text-center md:text-left">
        <p className='text-xl font-semibold underline mb-2'>CONTACT US</p>
        <p className="text-lg"><strong>Email:</strong> <a href="mailto:support@ecommerce.com" className="hover:text-purple-300">support@ecommerce.com</a></p>
        <p className="text-lg"><strong>Phone:</strong> <a href="tel:+11234567890" className="hover:text-purple-300">+1 (123) 456-7890</a></p>
      </div>
    </div>

    {/* Social Media Links */}
    <div className="mt-6 flex justify-center space-x-6">
        <a href="https://www.youtube.com/watch?v=_t8MpHOgO_s" aria-label="YouTube" className="hover:text-purple-300">
            <i className="fa-brands fa-youtube text-3xl"></i>
        </a>
        <a href="/" aria-label="Facebook" className="hover:text-purple-300">
            <i className="fa-brands fa-facebook text-3xl"></i>
        </a>
        <a href="/" aria-label="Twitter" className="hover:text-purple-300">
            <i className="fa-brands fa-twitter text-3xl"></i>
        </a>
        <a href="/" aria-label="Instagram" className="hover:text-purple-300">
            <i className="fa-brands fa-instagram text-3xl"></i>
        </a>
    </div>

    {/* Footer Bottom */}
    <div className="mt-8 text-center text-xs text-white/70">
      <div>© 2024 BEST E-COMMERCE PLATFORM. All rights reserved to GROUP-31.</div>
    </div>
  </footer>
);

export default Footer;
