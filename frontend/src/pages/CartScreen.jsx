import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessagBox';
import { Store } from '../Store';

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };
  return (
    <div>
      <h1>Your cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <div className="list-group">
              {cartItems.map((item) => (
                <div className="list-group-item" key={item._id}>
                  <div className="align-item-center row">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        alt={item.image}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-3 d-flex">
                      <span>
                        <button
                          class="btn btn-light"
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                        >
                          <br />
                          <i className="fas fa-minus-circle"></i>
                        </button>
                      </span>{' '}
                      <span>
                        <br />
                        {item.quantity}
                      </span>{' '}
                      <span>
                        <button
                          class="btn btn-light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <br />
                          <i className="fas fa-plus-circle"></i>
                        </button>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <br />
                      LKR {item.price}
                    </div>
                    <div className="col-md-2">
                      <br />
                      <span
                        type="button"
                        class="btn btn-light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="list-group flush">
                <div className="list-group-item">
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items):
                    <br />
                    LKR{' '}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </div>
                <div className="list-group-item">
                  <div className="d-grid">
                    <button
                      type="button"
                      class="btn btn-primary"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
