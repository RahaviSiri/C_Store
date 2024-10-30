import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

const ProductSearchResults = () => {
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const Params = new URLSearchParams(location.search);
  //const combination = Params.get('combination');
  //const [searchParams] = useSearchParams();
  const searchPrompt = Params.get('searchQuery');

  console.log(searchPrompt);

  // Function to fetch product data based on search prompt
  const getProductData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/searchProducts", {searchPrompt});
      console.log(response);
      //const searchedProducts = await response.json();
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [searchPrompt]);

  // Function to truncate description
  // const truncateDescription = (description, maxLength = 100) => {
  //   if (description.length <= maxLength) return description;
  //   return `${description.substring(0, maxLength)}...`;
  // };

  return (
    <div className='p-5 md:p-10 mb-5 transition-opacity ease-in duration-500 opacity-100'>
      {Products.map((product, index) => (
        <div key={index} className="mb-6">
          <div className='flex flex-col sm:flex-row gap-3'>
            {/* Product Images */}
            <div className='mb-4 sm:mb-0'>
              <img
                src={product.picture_url}
                alt={`Image of ${product.name}`}
                className='w-full h-auto object-cover max-w-[200px] sm:max-w-[300px] md:max-w-[400px] rounded-lg'
              />
            </div>

            {/* Product Info */}
            <div 
              onClick={() => navigate(`/productdetails?sku=${product.SKU}`)}
              className='flex-1 flex flex-col justify-between pl-2 sm:pl-4 cursor-pointer'
            >
              <div className='flex flex-col gap-3'>
                <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
                <p className='text-3xl font-medium'>$ {product.price}</p>
                <p className='text-gray-500'>{product.description}</p>
              </div>
            </div>
          </div>

          {/* Horizontal line after each product */}
          <hr className="my-6 border-0 h-[0.5px] bg-gray-500" />
        </div>
      ))}
      
      <div className='text-center mt-9'>
        <Link to={"/productcategory"} className='bg-purple-500 text-white p-4 text-lg font-bold rounded'>Other Categories</Link>
      </div>
    </div>
  );
};

export default ProductSearchResults;
