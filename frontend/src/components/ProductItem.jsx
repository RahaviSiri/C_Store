import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out h-72' src={image[0]} alt={name} />
      </div>
      <p className='pt-3 pb-1 text-xl'>{`Product Category : ${name}`}</p>
    </Link>
  );
};

export default ProductItem;
