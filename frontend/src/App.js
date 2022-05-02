import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import ProductScreen from './pages/ProductScreeen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="nav bg-dark navbar-dark">
          <span className='col-md-1'></span>
          <Link className='navbar-brand' to='/' >Shopping Cart</Link>
          <Link to='/cart' className='nav-item nav-link navbar-dark'>Cart</Link>

        </header>
        <main>
          <div className="container mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />}></Route>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
