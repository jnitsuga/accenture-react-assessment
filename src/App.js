import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Products from './pages/Products';
import ViewProduct from './pages/ViewProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <ToastContainer />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Products />} />
          <Route path='/viewproduct/:productId' element={<ViewProduct />} />
          <Route path='/carts/user/:userId' element={<Cart />} />
          <Route path='/carts/user/:userId/checkout' element={<Checkout />} />
          <Route path='/success' element={<CheckoutSuccess />} />

        </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
