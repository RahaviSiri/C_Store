import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductCategory from './pages/ProductCategory';
import Cart from './pages/Cart';
import AboutUs from './pages/About_us'; 
import Contact from './pages/Contact';
import Login from './pages/Login';
import PlaceOrder from './pages/Place_order'; 
import Order from './pages/Order';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetails from './ProductPage/productDetails';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import Product1 from './products/Product1';
import Checkout from './pages/Checkout';
// import searchResults from './pages/searchResults';



const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ProductCategory' element={<ProductCategory />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/About_us' element={<AboutUs />} /> 
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Place_order' element={<PlaceOrder />} /> 
        <Route path='/Product1/:id' element={<Product1/>} />
        <Route path='/productDetails/:id' element={<ProductDetails/>} /> 
        <Route path='/Order' element={<Order />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/NotFound' element={<NotFound/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        {/* <Route path="/searchResults" element={<searchResults />} /> */}

      </Routes>
      <Footer />
    </div>
  );
};

export default App;

// Hi
