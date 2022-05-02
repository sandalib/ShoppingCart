import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Product from '../components/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div className="alert alert-danger">{error}</div>
  ) : (
    <div>
      <h1>Product List</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.slug}>
            <Product product={product}></Product>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
