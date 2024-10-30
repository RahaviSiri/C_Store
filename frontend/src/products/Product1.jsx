import React, { useEffect, useState } from 'react';
import { assets } from '../../public/assets/assets';
import { Link, useParams ,useNavigate} from 'react-router-dom';
// import { productsItems } from '../../public/assets/assets2'; 
import "./style.css"

const Product1 = () => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const [productSet,setProductSet] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProductSet = async () => {
      try {
        // Send categoryId as query parameter to backend
        const response = await fetch(`http://localhost:3001/productSet?categoryId=${id}`);
        const data = await response.json();
        setProductSet(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProductSet();
  }, [id]);

  // Array of sold counts
  const soldCount = [23, 123, 78, 90];
  const offers = ["Best Price in similar deals", "Extra 5% off with coins", "Get free shipping with coins"];

  // // Function to fetch and filter product data based on categoryId
  // const fetchProductData = async () => {
  //   // Get the selected product based on the id from useParams
  //   const selectedProduct = productsItems.find((product) => product.categoryId === id);

  //   if (selectedProduct) {
  //     // Filter products with the same categoryId as the selected product
  //     const filtered = productsItems.filter(
  //       (product) => product.categoryId === selectedProduct.categoryId
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // };

  // useEffect(() => {
  //   fetchProductData();
  // }, [id]);

  // Function to truncate description
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <div className='p-5 md:p-10 mb-5 transition-opacity ease-in duration-500 opacity-100'>
      {filteredProducts.map((product, index) => {
        // Get a random sold count from the soldCount array
        const randomSoldCount = soldCount[Math.floor(Math.random() * soldCount.length)];
        const showOffer = index % 2 === 0; // Show offer for every second product
        const randomSoldOffer = offers[Math.floor(Math.random() * offers.length)];
        
        return (
          <div key={index} className="mb-6">
            <div className='flex flex-col sm:flex-row gap-3'>
              {/* Product Images */}
              <div className='mb-4 sm:mb-0'>
                <img
                  src={`${product.picture_url}`}
                  alt={`Image of ${product.product_name}`}
                  className='w-full h-auto object-cover max-w-[180px] sm:max-w-[200px] md:max-w-[220px]'
                />
              </div>

              <dev onClick = {() => navigate(`/productdetails?sku=${product.SKU}`)} className='flex-1 flex flex-col justify-between pl-2 sm:pl-4'>
                {/* Product Info */}
                <div className='flex flex-col gap-3'>
                  <h1 className='font-medium text-2xl mt-2'>{product.product_name}</h1>
                  {/* Star Ratings */}
                  <div className='flex flex-row gap-2 my-1'>
                    <img src={assets.Star} alt="" className='w-3.5' /> 
                    <p className=''>4.7</p>
                  </div>
                  {/* Displaying random sold count */}
                  <p className='text-lg font-medium'>{randomSoldCount} items sold</p>
                  <p className='text-3xl font-medium'>$ {product.price}</p>
                  <p className='text-gray-500'>{truncateDescription(product.description)}</p>
                  
                  {/* Conditionally render the offer with animation */}
                  {showOffer && (
                    <p className='text-red-600 animated-offer'>{randomSoldOffer}</p>
                  )}
                </div>
              </dev>
            </div>

            {/* Horizontal line after each product */}
            <hr className="my-6 border-0 h-[0.5px] bg-gray-500" />
          </div>
        );
      })}
        <div className='text-center mt-9'>
              <Link to={"/productcategory"} className='bg-purple-500 text-white p-4 text-lg font-bold rounded'>Other Categories</Link>
        </div>
    </div>
  );
};

export default Product1;
