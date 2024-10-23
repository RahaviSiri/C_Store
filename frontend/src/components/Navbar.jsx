import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { assets } from '../../public/assets/assets';
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const { productsItems } = useContext(ShopContext);
  const [cartCount,setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const userId = 1;

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cart/count/${userId}`);
      const data = await response.json();
      setCartCount(data.count);
    } catch (error) {
      setError('Error fetching cart items. Please try again.');
      console.error('Error fetching cart items:', error);
    } 
  };

  // Function to handle search
  const handleSearch = () => {
    const foundProduct = productsItems.find(
      (item) => item.type.toLowerCase() === searchQuery.toLowerCase() 
    );
    if (foundProduct) {
      navigate(`/product1/${foundProduct.categoryId}`);
    } else {
      navigate("/NotFound");
    }
    setSearchQuery("");
  };

  return (
    <nav className='bg-purple-800 text-white'>
      <div className='flex items-center justify-between py-3 px-4 sm:px-5'>
        {/* Logo */}
        <div className='flex items-center'>
          <img src={assets.Storelogo} className='w-32' alt="Store Logo" />
        </div>

        {/* Desktop Links */}
        <div className='hidden lg:flex space-x-8 text-lg ml-10'>
          <Link to='/' className='hover:text-indigo-400'>Home</Link>
          <Link to='/ProductCategory' className='hover:text-indigo-400'>Products</Link>
          <Link to='/Cart' className='hover:text-indigo-400'>Cart</Link>
          {/* <Link to='/About_us' className='hover:text-indigo-400'>About</Link> */}
          <Link to='/Order_history' className='hover:text-indigo-400'>About</Link>
          <Link to='/Contact' className='hover:text-indigo-400'>Contact</Link>
        </div>

        {/* Cart and Profile Icons (aligned to the right on all screens) */}
        <div className='flex items-center space-x-5 ml-auto'>
          {/* Search Bar and Icons */}
          <div className='hidden lg:flex items-center space-x-6'>
            <div className='flex items-center gap-3'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
                placeholder='Search...'
                className='hidden sm:block px-4 py-2 rounded-md focus:outline-none text-black'
              />
              <i 
                className='fa-solid fa-magnifying-glass cursor-pointer'
                onClick={handleSearch} 
              ></i>
            </div>
            <Link to='/Login' className='hidden sm:block hover:text-indigo-400'>Login</Link>
          </div>

          {/* Cart Icon */}
          <div className='relative'>
            <Link to='/Cart'>
              <i className="fa-solid fa-cart-shopping text-2xl"></i> {/* Cart icon */}
            </Link>
            <span className='absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full'>
            {cartCount}
            </span>
          </div>

          {/* Profile Icon */}
          <div>
            <Link to='/Profile'>
            <img src={assets.ProfilePicIcon} alt="Profile Icon" className='mr-2 w-10 h-10 rounded-full cursor-pointer'/>
            </Link>
          </div>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className='lg:hidden flex items-center'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='focus:outline-none'>
            <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden'>
          <div className='flex flex-col space-y-2 px-4 py-2 bg-purple-800'>
            <Link to='/' className='hover:text-yellow-500'>Home</Link>
            <Link to='/ProductCategory' className='hover:text-yellow-500'>Our Products</Link>
            <Link to='/Cart' className='hover:text-yellow-500'>Cart</Link>
            <Link to='/About_us' className='hover:text-yellow-500'>About Us</Link>
            <Link to='/Contact' className='hover:text-yellow-500'>Contact Us</Link>
            <Link to='/Login' className='hover:text-yellow-500'>Login</Link>
            <Link to='/Profile' className='hover:text-yellow-500'>Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
