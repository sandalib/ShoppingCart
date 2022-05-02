import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info text-decoration-none">
                <Link to={`/product/${product.slug}`}>
                  <h4>{product.name}</h4>
                </Link>
                <p>
                  <strong>LKR {product.price}</strong>
                </p>
                <button className="btn btn-primary">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
