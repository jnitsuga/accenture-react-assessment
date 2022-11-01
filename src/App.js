import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'
import Products from './pages/Products';
import ViewProduct from './pages/ViewProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <ToastContainer />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/viewproduct/:productId' element={<ViewProduct />} />

        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
