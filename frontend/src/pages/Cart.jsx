import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [cart_total, setTotal] = useState(0);
  const [cart_id, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // New state for selected items

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (!token) {
      console.log('No token found. Redirecting to login...');
      navigate('/Login');
      //return;
    }

    try {
      if (!token) {
        return;
      }
      setLoading(true);
      const response = await axios.post('http://localhost:3001/getCartItems', { token });
      const { cartItems, cart_id , cart_total} = response.data; // Assuming this structure from the response
      console.log(cartItems);
      setItems(cartItems);
      setTotal(cart_total);
      setId(cart_id);
      //calculateTotal(cartItems); // Update the total price
    } catch (error) {
      setError('Error fetching cart items. Please try again.');
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  // const calculateTotal = (items) => {
  //   const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  //   setTotal(totalAmount);
  // };

  const incrementCartItem = async (cart_id, variant_id) => {
    try {
      await axios.post('http://localhost:3001/incrementItem', { cart_id, variant_id });
      fetchCartItems(); // Refetch items to reflect the change
    } catch (error) {
      console.error('Error incrementing cart item:', error);
    }
  };

  const decrementCartItem = async (cart_id, variant_id) => {
    try {
      await axios.post('http://localhost:3001/decrementItem', { cart_id, variant_id });
      fetchCartItems(); // Refetch items to reflect the change
    } catch (error) {
      console.error('Error decrementing cart item:', error);
    }
  };

  const removeCartItem = async (cart_id, variant_id) => {
    try {
      await axios.post('http://localhost:3001/deleteItem', { cart_id, variant_id });
      fetchCartItems(); // Refetch items to reflect the change
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId); 
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const getCheckoutCombination = () => {
    let combination = '';
    items.forEach((item) => {
      combination += selectedItems.includes(item.item_index) ? '1' : '0';
    });
    return combination;
  };

  const checkout = () => {
    const combination = getCheckoutCombination();
    //const cart_id = "your_cart_id"; // Replace with actual cart_id
    //const customer_id = "your_customer_id"; // Replace with actual customer_id

    console.log('Checkout combination:', combination);

    // Call checkout page with params combination, cart_id, and customer_id
    if (combination !== '00') {
        navigate(`/checkout?combination=${combination}&cart_id=${cart_id}`);
    }
    else {
      alert('Please select at least one item to checkout!');
    }
  };


  if (loading) {
    return <div className="text-center">Loading cart items...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg m-5 border border-gray-200">
      <h2 className="text-4xl font-bold text-purple-700 text-center mb-6">Shopping Cart</h2>
      {!items ? (
        <div className="text-center text-xl text-gray-600">Your cart is empty.</div>
      ) : (
        items.map((item) => (
          <div key={item.variant_id} className="w-full bg-gray-50 mb-4 p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-300">
            <input 
              type="checkbox"
              checked={selectedItems.includes(item.item_index)} 
              onChange={() => handleCheckboxChange(item.item_index)} 
              className="mr-4"
            />
            <div className="flex items-center">
              <button onClick={() => decrementCartItem(cart_id, item.variant_id)} className="bg-purple-200 text-purple-600 p-2 rounded-md mr-2 hover:bg-purple-300 transition duration-200">-</button>
              <span className="mx-2 font-semibold">{item.quantity}</span>
              <button onClick={() => incrementCartItem(cart_id, item.variant_id)} className="bg-purple-200 text-purple-600 p-2 rounded-md ml-2 hover:bg-purple-300 transition duration-200">+</button>
            </div>
            <span className="flex-1 text-center font-semibold text-lg">{item.name}</span>
            <span className="flex-1 text-center font-semibold text-lg">{item.item_index}</span>
            <span className="flex-1 text-center font-semibold text-lg">${item.total_price}</span>
            <button onClick={() => removeCartItem(cart_id, item.variant_id)} className="text-lg text-red-500 hover:underline">Remove</button>
          </div>
        ))
      )}
      <div className="flex justify-between w-full mt-6 border-t pt-4 border-gray-300">
        <div className="text-xl font-bold text-purple-800">Total: ${cart_total}</div>
        <button onClick = {() => checkout()} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-200">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;