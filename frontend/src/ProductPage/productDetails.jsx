import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../Context/ShopContext";
import { useParams } from 'react-router-dom';
import { assets } from '../../public/assets/assets';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const { currency, productsItems } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [notification, setNotification] = useState(''); // State for notification

  useEffect(() => {
    const foundProduct = productsItems.find(item => item._id === id);
    setProduct(foundProduct);
    if (foundProduct) {
      const initialColor = foundProduct.variants[0].color;
      const initialSize = foundProduct.variants[0].sizes[0].size;
      setSelectedColor(initialColor);
      setSelectedSize(initialSize);
      setSelectedImage(foundProduct.image[initialColor]);
    }
  }, [id, productsItems]);

  if (!product) {
    return <div className='p-10'>Product not found!</div>;
  }

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const newVariant = product.variants.find(variant => variant.color === color);
    if (newVariant) {
      setSelectedSize(newVariant.sizes[0].size); // Default to the first size
      setSelectedImage(product.image[color]); // Change image based on selected color
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        user_id: 1,
        product_id: product._id,
        product_name: product.name,
        quantity: 1,
        price: product.price,
      };
  
      await axios.post('http://localhost:3000/cart/add', cartItem);
      setNotification('Product added to cart successfully!');
// <<<<<<< suki008_about_us-changed
      setTimeout(() => setNotification(''), 5000); // Clear the notification after 5 seconds
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setNotification('Failed to add product to cart.');
      setTimeout(() => setNotification(''), 5000); // Clear the notification after 5 seconds
// =======
//       setTimeout(() => setNotification(''), 3000); // Clear the notification after 3 seconds
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       setNotification('Failed to add product to cart.');
//       setTimeout(() => setNotification(''), 3000); // Clear the notification after 3 seconds
// >>>>>>> main
    }
  };

  const ratingValue = product.rating || 0;
  const totalStars = 5;

  return (
    <div className='border-t-2 p-7 transition-opacity ease-in duration-500 opacity-100'>
      {notification && (
        <div className='bg-green-200 text-green-700 p-3 mb-4 rounded'>
          {notification}
        </div>
      )}

      <div className='flex flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='sm:w-[80%]'>
            <img src={product.image} alt={product.name} className='w-full h-auto mb-3' />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <div className='flex flex-row gap-2 my-1'>
              {Array.from({ length: totalStars }, (_, index) => (
                <img 
                  key={index} 
                  src={assets.Star} 
                  alt="" 
                  className='w-3.5' 
                  style={{ opacity: index < ratingValue ? 1 : 0.5 }} 
                />
              ))}
            </div>
          </div>
          <p className='mt-4'>{product.description}</p>
          <p className='mt-4 text-2xl font-semibold'>{currency} {product.price}</p>

          <div className='mt-4'>
            <h3 className='font-bold'>Color:</h3>
            <div className='flex gap-2 mt-2'>
              {product.variants.map((variant, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded ${selectedColor === variant.color ? 'bg-purple-300' : ''}`}
                  onClick={() => handleColorChange(variant.color)}
                  aria-label={`Select color ${variant.color}`}
                >
                  {variant.color}
                </button>
              ))}
            </div>
          </div>

          <div className='mt-4'>
            <h3 className='font-bold'>Size:</h3>
            <div className='flex gap-2 mt-2'>
              {product.variants.find(variant => variant.color === selectedColor)?.sizes.map((sizeOption, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded ${selectedSize === sizeOption.size ? 'bg-purple-300' : ''}`}
                  onClick={() => handleSizeChange(sizeOption.size)}
                  aria-label={`Select size ${sizeOption.size}`}
                >
                  {sizeOption.size}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
          
          <p className='bg-amber-200 text-amber-700 my-6 p-2'>
            <i className="fa-solid fa-certificate"></i> Certified brands and genuine items
          </p>
        </div>
      </div>

      <div className='border-2 border-indigo-600 border-dashed rounded-md p-5 my-6'>
        <div className='flex flex-row'>
          <h1 className='text-lg font-bold'>Reviews: </h1>
          <p className='bg-green-200 p-1 ml-2 rounded'>
            <i className="fa-solid fa-check"></i> All from verified purchases
          </p>
        </div>
        <div className='m-4'>
          {Array.isArray(product.review) && product.review.length > 0 ? (
            product.review.map((review, index) => (
              <p className='flex items-center mt-2' key={index}>
                <img src={assets.Profile} className='w-10' alt="Profile" />
                <span className='ml-2'>{review}</span>
              </p>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
