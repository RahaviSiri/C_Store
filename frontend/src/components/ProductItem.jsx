import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name }) => {

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product1/${id}`}>
      <div className='overflow-hidden'>
        <img 
          className='w-full h-72 object-cover md:h-56 lg:h-72' 
          src={`/assets/${image}`} 
          alt={name} 
        />
      </div>
      <p className='text-xl text-white text-center bg-purple-500 p-3 rounded-b-lg'>
        {`${name}`}
      </p>
    </Link>
  );
};

export default ProductItem;
