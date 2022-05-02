import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const [{ product }, dispatch] = useReducer(reducer, {
    product: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </div>
        <div className="col-md-3">
          <div className="list-group flush">
            <div className="list-group-item">
              <h1>{product.name}</h1>
            </div>
            <div className="list-group-item">Pirce : LKR {product.price}</div>
            <div className="list-group-item">
              Description:
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="list-group flush">
                <div className="list-group-item">
                  <div className="row">
                    <div className="col">Price:</div>
                    <div className="col">LKR {product.price}</div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col">Status:</div>
                    {/* <div className="col">
                      {product.countInStock > 0 ? (
                        <span className="badge badge-success">In Stock</span>
                      ) : (
                        <span className="badge badge-danger">Unavailable</span>
                      )}
                    </div> */}
                  </div>
                </div>

                {/* {product.countInStock > 0 && (
                  <div className="list-group-item">
                    <div className="d-grid">
                      <input type="button" class="btn btn-primary">
                        Add to Cart
                      </input>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
