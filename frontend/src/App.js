import React, { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import CheckoutScreen from './pages/CheckoutScreen';
import ProductScreen from './pages/ProductScreeen';
import { Store } from './Store';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div>
        <header className="nav bg-dark navbar-dark">
          <span className='col-md-1'></span>
          <Link className='navbar-brand' to='/' >Shopping Cart</Link>
          <div className='nav me-auto'>
            <Link to='/cart' className='nav-item nav-link'>Cart
              {cart.cartItems.length > 0 && (
                <div className='badge bg-pill bg-danger'>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </div>
              )}
            </Link>
          </div>


        </header>
        <main>
          <div className="container mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
