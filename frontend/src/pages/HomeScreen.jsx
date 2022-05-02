import React, { useEffect, useState } from 'react';
// import data from '../data';
import axios from 'axios';

// const reducer = (state, action) => {
//   switch (action.type) {
//       case 'FETCH_REQUEST':
//           return { ...state, loading: true };
//       case 'FETCH_SUCCESS':
//           return { ...state, products: action.payload, loading: false };
//       case 'FETCH_FAIL':
//           return { ...state, loading: false, error: action.payload };
//       default:
//           return state;
//   }
// }

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Product List</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.slug}>
            <div className="product">
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-info text-decoration-none">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p>
                  <strong>LKR {product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
