//Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ImageSwitcher from '../components/ImageSwithcher';  
import Card from '../components/Card';
import { productsItems } from '../../public/assets/assets2';

const images = [
  '/1.jpg',
  '/iphone.webp',
  '/mac2.webp',
  '/car.jpg',
  '/teddy.jpeg',
];

const Home = () => {
  const productCategories = [
    productsItems.find(product => product.categoryId === '1'),  
    productsItems.find(product => product.categoryId === '2'),  
    productsItems.find(product => product.categoryId === '3'),
    productsItems.find(product => product.categoryId === '8'),
    productsItems.find(product => product.categoryId === '9'),
    productsItems.find(product => product.categoryId === '5')
  ].filter(product => product);

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='hero bg-purple-300 text-white py-12 md:py-16 text-center'>
        <h1 className='text-2xl md:text-5xl font-extrabold mb-4'>Welcome to C-Store</h1>
        <p className='text-base font-bold md:text-lg mb-6'>Explore the best in electronics and toys!</p>
        <Link to="/ProductCategory">
          <button className='bg-purple-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium hover:bg-purple-700 transition duration-300'>
            Shop Now
          </button>
        </Link>
      </section>
      
      {/* Promotions Section */}
      <div className='promotions my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4'>
        {['New Arrivals', 'Best Sellers', 'Special Offers'].map((title, index) => (
          <div 
            key={index} 
            className='bg-gradient-to-r from-purple-400 via-pink-500 to-pink-600 p-4 md:p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300'>
            <h2 className='text-lg md:text-xl font-semibold mb-2 text-white'>{title}</h2>
            <p className='text-sm md:text-base text-white'>Check out the latest products in our collection.</p>
          </div>
        ))}
      </div>

      {/* Featured Products Section */}
      <div className='flex flex-col items-center mb-6 md:mb-12 px-4'>
        <h2 className='text-xl md:text-2xl font-bold text-center text-purple-500 mb-4 md:mb-6'>Featured Products</h2>
        
        {/* ImageSwitcher - Add max width for responsiveness */}
        <div className='w-full max-w-4xl mb-4 md:mb-6'>
          <ImageSwitcher images={images} />
        </div>
        
        {/* Product Cards - Responsive grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {productCategories.map((product, index) => (
            <Card 
              key={index} 
              itemName={product.name} 
              details={"Good Product"} 
              price={product.price} 
              image={product.image} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
