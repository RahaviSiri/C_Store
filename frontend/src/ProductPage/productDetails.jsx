import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../Context/ShopContext";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const { currency, productsItems } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null); // Selected variant state
  const [sku, setSku] = useState('SKU001'); // For SKU input testing
  const [SKU, setSKU] = useState('SKU001'); // For SKU input testing
  const [notification, setNotification] = useState(''); // State for notification
  const [quantity, setQuantity] = useState(1); // Quantity selector
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch product by SKU or by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Show loading while fetching data
        // Make API call to the backend with SKU
        const productFetchRes = await axios.post("http://localhost:3001/getProduct", { SKU: sku });
        //console.log(productFetchRes);
        const foundProduct = productFetchRes.data.product;
        //console.log(foundProduct);

        const variantFetchRes = await axios.post("http://localhost:3001/getVariants", {SKU: sku});
        //console.log(variantFetchRes);
        const variantList = variantFetchRes.data.variants;
        //console.log(variantList);

        if (foundProduct) {
          setProduct(foundProduct);
          
          //console.log(foundProduct);
          //setVariants(foundProduct.variants); // Set the variants dynamically
          //setSelectedVariant(foundProduct.variants[0]); // Default to the first variant
        } else {
          setError('Product not found');
        }

        if (variantList) {
          setVariants(variantList); // Set the variants dynamically
          setSelectedVariant(variantList[0]); // Default to the first variant
    
        } else {
          setError('Variants not found');
        }

      } catch (err) {
        console.error('Error fetching:', err);
        setError('Failed to fetch');
      } finally {
        setLoading(false); // Stop loading when the request is complete
      }
    };

    fetchProduct(); // Call the function inside useEffect
  }, [sku]); // Only rerun this effect if the SKU changes

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 

  // Handle variant card selection
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  // Handle Add to Cart action
  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    try {
      const cartItem = {
        user_id: 1, // Assuming user_id is 1 for now
        product_id: product._id,
        variant_id: selectedVariant.variant_id,
        quantity,
        price: selectedVariant.price, // Variant-specific price
      };

      await axios.post('http://localhost:3001/addToCart', cartItem);
      setNotification('Product added to cart successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setNotification('Failed to add product to cart.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  if (!product || !variants) {
    return <div className='p-10'>Product or variants not found!</div>;
  }

  // console.log(selectedVariant.picture_url);
  // console.log(product.name);
  // console.log(product.description);
  // console.log(variants[0].attributes);
  // console.log(variants[0].stock);

  return (
    <div className='border-t-2 p-7 transition-opacity ease-in duration-500 opacity-100'>
      {notification && (
        <div className='bg-green-200 text-green-700 p-3 mb-4 rounded'>
          {notification}
        </div>
      )}

      <div className='flex flex-col sm:flex-row'>
        <div className='flex-1'>
        <img 
          src={selectedVariant ? selectedVariant.picture_url : 'https://images.squarespace-cdn.com/content/v1/58c04c7cb3db2b1cbe0a403b/dce7faef-d29b-4a60-abe5-65c978fd07ef/best-affordable-camera-for-wildlife-photography.JPG?format=1500w'} 
          alt={product.name} 
          className='w-[95%] h-auto mb-3 rounded-lg' // Use 'rounded-lg' for rounded corners
        />

        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
          <p className='mt-4'>{product.description}</p>

          {/* Display SKU input for testing */}
          <div className='mt-4'>
            <input 
              type="text" 
              value={SKU} 
              onChange={(e) => setSKU(e.target.value)} 
              placeholder="Enter SKU for testing"
              className="border p-2 rounded"
            />
            <button 
              onClick={() => setSku(SKU)} // Use the button to fetch with the current SKU
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Test SKU
            </button>
          </div>

          {/* Display selected variant price */}
          <p className='mt-4 text-2xl font-semibold'>
            {currency} {selectedVariant.price}
          </p>

          {/* Variant Cards */}
          <div className='mt-4'>
            <h3 className='font-bold'>Select Variant:</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2'>
            {variants.map((variant, index) => (
              <div 
                key={index}
                className={`border p-4 rounded cursor-pointer ${selectedVariant === variant ? 'border-purple-500 bg-purple-100' : 'border-gray-300'}`}
                onClick={() => handleVariantSelect(variant)}
              >
                {variant.attributes ? (
                  Object.entries(variant.attributes).map(([key, value]) => (
                    <p key={key}><strong>{key}:</strong> {value}</p>
                  ))
                ) : (
                  <p><strong>Color:</strong> {variant.color}</p>
                )}
                <p><strong>Stock:</strong> {variant.stock}</p>
              </div>
            ))}

            </div>
          </div>

          {/* Quantity Selector */}
          <div className='mt-4'>
            <label htmlFor="quantity" className="font-bold">Quantity:</label>
            <input 
              id="quantity"
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="border p-2 ml-2 rounded w-16"
            />
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart} 
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>

          {/* Certificate info */}
          <p className='bg-amber-200 text-amber-700 my-6 p-2'>
            <i className="fa-solid fa-certificate"></i> Certified brands and genuine items
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

