import React, { useState, useEffect } from 'react';
import { assets } from '../../public/assets/assets';
import { useParams } from 'react-router-dom';
import { useNavigate , useLocation} from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const Params = new URLSearchParams(location.search);
  const combination = Params.get('combination');
  const cart_id = Params.get('cart_id');
  const [notification, setNotification] = useState('');
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Fetch items from backend
    const fetchCheckoutItems = async () => {
      try {
        console.log(combination);
        console.log(cart_id);
        const response = await axios.post(`http://localhost:3001/getCheckoutItems`, {combination, cart_id});
        console.log(response.data);
        setCheckoutItems(response.data.checkoutItems);
        calculateSubtotal(response.data.checkoutItems);
      } catch (error) {
        console.error('Failed to fetch checkout items:', error);
      }
    };

    fetchCheckoutItems();
  }, [combination]);

  // Calculate subtotal from cart items
  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setSubtotal(total);
  };

  const handleCheckout = async () => {
    console.log(cart_id);
    console.log(combination);
    console.log(paymentMethod);
    try {
      if (!paymentMethod) {
        alert('Please select a payment method');
        return;
      }
      const checkoutResponse = await axios.post(`http://localhost:3001/checkout`, {cart_id, combination, paymentMethod});
      console.log(checkoutResponse);
      setNotification(checkoutResponse.data.message);
      setTimeout(() => setNotification(''), 5000);
    } catch (error) {
      console.error('Failed to checkout items:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {notification && (
        <div className='bg-green-200 text-green-700 p-3 mb-4 rounded'>
          {notification}
        </div>
      )}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-semibold mb-4">Items in Your Cart</h1>
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-purple-800 bg-purple-300 p-3">
            <i className="fa fa-credit-card" aria-hidden="true"></i> Buy confidently with Etsy's Purchase Protection program for buyers.
          </p>
        </div>

        {/* Display each cart item */}
        {checkoutItems.map((item) => (
          <div key={item.id} className="flex justify-between items-start mb-4">
            <div className="flex items-start space-x-4">
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-40 h-40 rounded-md object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-700">{item.description}</p>
                <p className="text-sm text-gray-500">Color: {item.color}</p>
                <p className="text-sm text-gray-500">Order Date: {item.orderDate}</p>
                <p className="text-sm text-gray-500">Estimated Delivery Date: {item.deliveryDate}</p>
                <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                {/* <button className="text-sm text-blue-500 mt-2">Save for later</button>
                <button className="text-sm text-red-500 ml-4">Remove</button> */}
              </div>
            </div>

            <div className="text-lg font-semibold text-gray-900">${(item.price).toFixed(2)}</div>
          </div>
        ))}

        {/* Payment Section */}
        <div className="mt-6 bg-purple-200 p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">How You'll Pay</h3>
          <div className="flex space-x-4 mt-4">
            {['Visa', 'MasterCard', 'PayPal', 'Google Pay', 'Store Pickup', 'Cash on Delivery'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`bg-white p-3 rounded-lg border ${
                  paymentMethod === method ? 'border-purple-800' : 'border-gray-300'
                } shadow-sm`}
              >
                {method === 'Visa' && <img src={assets.visa} alt="Visa" className="w-16" />}
                {method === 'MasterCard' && <img src={assets.mastercard} alt="MasterCard" className="w-16" />}
                {method === 'PayPal' && <img src={assets.paypal} alt="PayPal" className="w-16" />}
                {method === 'Google Pay' && <img src={assets.gpay} alt="Google Pay" className="w-16" />}
                {method !== 'Visa' && method !== 'MasterCard' && method !== 'PayPal' && method !== 'Google Pay' && (
                  <span>{method}</span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-gray-900 font-semibold mt-4">
              <span>Subtotal : </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full bg-purple-800 text-white py-3 rounded-lg mt-6"
            onClick={() => handleCheckout()}
          >
            Confirm checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;




















// import React, { useState } from 'react';
// import { assets } from '../../public/assets/assets';

// const Checkout = () => {
//   const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (e) => {
//     setQuantity(e.target.value);
//   };

//   return (
//     // It shoud show the products in cart Page
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-xl">
//         {/* Header Section */}
//         <h1 className="text-2xl font-semibold mb-4">Item from your cart</h1>
//         <div className="border-b pb-4 mb-4">
//           <p className="text-sm text-purple-800 bg-purple-300 p-3">
//           <i class="fa fa-credit-card" aria-hidden="true"></i> Buy confidently with Etsy's Purchase Protection program for buyers.
//           </p>
//         </div>

//         {/* Cart Item Section */}
//         <div className="flex justify-between items-start">
//           {/* Product details */}
//           <div className="flex items-start space-x-4">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Product"
//               className="w-40 h-40 rounded-md object-cover"
//             />
//             <div>
//               <h2 className="text-lg font-semibold">Product Name</h2>
//               <p className="text-sm text-gray-700">
//                 Description Flower Jewelry Travel Case, Personalized Birthday Gift
//               </p>
//               <p className="text-sm text-gray-500">Primary color: Gray</p>
//               <p className="text-sm text-gray-500">Personalization: Hotjar loves you</p>
//               <p className="text-sm text-gray-500">Order Date: 2024.12.22</p>
//               <p className="text-sm text-gray-500">Delivery Date: 2024.12.22</p>
//               <button className="text-sm text-blue-500 mt-2">Save for later</button>
//               <button className="text-sm text-red-500 ml-4">Remove</button>
//             </div>
//           </div>

//           {/* Quantity */}
//           {/* It shoud be shown from database */}
//           <div>
//             <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
//               Quantity
//             </label>
//             <select
//               id="quantity"
//               name="quantity"
//               value={quantity}
//               onChange={handleQuantityChange}
//               className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
//             >
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Checkout details */}
//         <div className="border-t mt-6 pt-4">
//           <p className="text-sm text-gray-500">This order is a gift</p>
//           <div className='flex items-center my-2'>
//             <input
//               type="checkbox"
//               className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
//             />
//             <label className="text-sm text-gray-500">
//               Prices will not be shown on packing slip
//             </label>
//           </div>
//           <textarea
//             className="mt-2 block w-full border border-gray-300 rounded-md p-2"
//             placeholder="Add a note to Product Company (optional)"
//           />
//         </div>

//         {/* Payment Section */}
//         <div className="mt-6 bg-purple-200 p-6 rounded-md shadow-md">
//           <h3 className="text-lg font-semibold">How you'll pay</h3>
//           <div className="flex space-x-4 mt-4">
//             <button className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
//               <img src={assets.visa} alt="Visa" className='w-16'/>
//             </button>
//             <button className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
//               <img src={assets.mastercard} alt="Mastercard" className='w-16'/>
//             </button>
//             <button className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
//               <img src={assets.paypal} alt="PayPal" className='w-16'/>
//             </button>
//             <button className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
//               <img src={assets.gpay} alt="Google Pay" className='w-16'/>
//             </button>
//           </div>

//           <div className="mt-6">
//             <div className="flex justify-between text-gray-700">
//               <span>Subtotal</span>
//               <span>€24.52</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Shipping</span>
//               <span>€24.00</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Tax</span>
//               <span>€10.20</span>
//             </div>
//             <div className="flex justify-between text-gray-900 font-semibold mt-4">
//               <span>Total : </span>
//               <span>€58.76</span>
//             </div>
//           </div>

//           <button className="w-full bg-purple-800 text-white py-3 rounded-lg mt-6">
//             Proceed to checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
