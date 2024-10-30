import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../public/assets/assets';
import { ShopContext } from '../Context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import './Page.css';

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/productcategory');
        const data = await response.json();
        setProducts(data);
        setFilterProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.type));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subcategory));
    }
    setFilterProducts(productsCopy);
  };

  // const sortProduct = () => {
  //   let sortedProducts = [...filterProducts];

  //   switch (sortType) {
  //     case "low-high":
  //       sortedProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "high-low":
  //       sortedProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     default:
  //       return;
  //   }

  //   setFilterProducts(sortedProducts);
  // };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  // useEffect(() => {
  //   sortProduct();
  // }, [sortType, filterProducts]);

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 p-10 border-t tilt-neon-name mb-7'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img src={assets.drop_down_arrow} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-0' : '-rotate-90'}`} />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className="w-3" type="checkbox" value="Home" onChange={toggleCategory}/>Home Appliances
            </label>
            <label className='flex gap-2'>
              <input className="w-3" type="checkbox" value="Handheld" onChange={toggleCategory}/>Smart Handheld Devices
            </label>
            <label className='flex gap-2'>
              <input className="w-3" type="checkbox" value="ElectricToys" onChange={toggleCategory}/>Electric Toys
            </label>
          </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium '>TYPES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className="w-3" type="checkbox" value="Study" onChange={toggleSubCategory}/>Study
            </label>
            <label className='flex gap-2'>
              <input className="w-3" type="checkbox" value="Entertain" onChange={toggleSubCategory}/>Entertain
            </label>
            <label className='flex gap-2'>
              <input className="w-3" type="checkbox" value="DailyUse" onChange={toggleSubCategory}/>Daily Use
            </label>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1="ALL" text2="PRODUCTS CATEGORY" />
          {/* <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select> */}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem 
                key={index}
                name={item.name}
                id={item.category_id}
                image={item.image_url} 
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
