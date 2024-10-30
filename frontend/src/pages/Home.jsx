import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {
  const [productCategories, setProductCategories] = useState([]);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/productcategory'); // Adjust the URL if necessary
        const data = await response.json();
        setProductCategories(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-6">
        {/* Text Section */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center mb-2">
            <p className="text-lg font-semibold">Electronics & Toys Store</p>
            <div className="w-10 h-1 bg-black ml-2"></div>
        </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6">
            Where Shopping Meets Convenience
          </h1>
          <p className="text-base font-light mb-8">
            Browse our collection of cutting-edge electronics, from smartphones to home gadgets, built for the future.
          </p>
          <Link to="/ProductCategory">
            <button className="border border-black text-black px-4 py-2 md:px-6 md:py-3 rounded-full font-medium hover:bg-black hover:text-white">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative flex justify-center items-center">
          {/* Background Circles */}
          <img src="/assets/grey-circle.png" alt="Grey Circle" className="absolute w-2/3 h-auto z-0" />
          <img src="/assets/orange-circle.png" alt="Orange Circle" className="absolute w-1/2 h-auto z-0" />

          {/* Foreground Image */}
          <img src="/assets/HomePage.png" alt="Stationery" className="relative z-10 w-[70%] h-auto" />
        </div>
      </section>

      {/* Featured Products Section */}
      <div className="flex flex-col items-center my-8 px-6 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">FEATURED PRODUCTS</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.slice(0, 4).map((product, index) => (
            <div key={index} className="relative border rounded-md overflow-hidden shadow-md">
              {/* Product Image */}
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              
              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                {/* Price Box with Add to Cart Icon */}
                <div className="relative mb-2">
                  <div className="bg-black text-white text-center rounded-md p-2">
                    <span>{`$${product.price.toFixed(2)}`}</span>
                    <div className="absolute top-1 right-1 flex items-center cursor-pointer hover:bg-gray-800 rounded-full p-1">
                      <i className="fa-solid fa-cart-shopping text-white text-sm"></i>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600">Top-tier electronics for your needs.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-0">WHY SHOP WITH US?</h2>
      <section className="my-8 bg-gray-100 py-6">
        <div className="flex justify-evenly items-center text-center">
          <div>
            <p className="font-bold">🚚 Free Shipping</p>
            <p className="text-sm">For selected products</p>
          </div>
          <div>
            <p className="font-bold">🔄 Easy Returns</p>
            <p className="text-sm">Hassle-free 30-day returns</p>
          </div>
          <div>
            <p className="font-bold">📦 Same Day Delivery</p>
            <p className="text-sm">Around the Texas Localhood</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-12 px-6">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">GLIMPSE AT OUR CUSTOMER REVIEWS</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-sm">
            <p className="italic">"Great product quality and super fast delivery"</p>
            <span className="block mt-4 font-semibold">- Andrew McDonald</span>
          </div>
          <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-sm">
            <p className="italic">"Excellent customer service and the best prices"</p>
            <span className="block mt-4 font-semibold">- Jamie Smith</span>
          </div>
          <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-sm">
            <p className="italic">"Awesome user experience with a user-friendly web page"</p>
            <span className="block mt-4 font-semibold">- Sarah Watson</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
