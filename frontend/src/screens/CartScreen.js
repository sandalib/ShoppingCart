import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import MessageBox from '../components/MessageBox';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
    const navigate = useNavigate();
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
            payload: item
        });
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };

    return (
        <div>
            <Helmet>
                <title>Your Cart</title>
            </Helmet>
            <h1>Your Cart</h1>
            <div className='row'>
                <div className='col-md-8'>
                    {cartItems.length === 0 ? (
                        <div className='MessageBox'>
                            Cart is empty <Link to="/">Go Shopping</Link>
                        </div>
                    ) : (
                        <div className="list-group">
                            {cartItems.map((item) => (
                                <div className="list-group-item" key={item._id}>
                                    <div className='align-item-center row'>
                                        <div className='col-md-4'>
                                            <img
                                                src={item.image}
                                                alt={item.image}
                                                className="img-fluid rounded img-thumbnail">
                                            </img>{' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </div>
                                        <div className='col-md-3 d-flex'>
                                            <span><button class="btn btn-light" onClick={() => updateCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                                <i className='fas fa-minus-circle'></i>
                                            </button></span>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <span><button class="btn btn-light" onClick={() => updateCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock}>
                                                <i className='fas fa-plus-circle'></i>
                                            </button></span>
                                        </div>
                                        <div className='col-md-3'>
                                            ${item.price}
                                        </div>
                                        <div className='col-md-2'>
                                            <span type="button" class="btn" onClick={() => removeItemHandler(item)} variant="light">
                                                <i className='fas fa-trash'></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='col-md-4'>
                    <div className="card">
                        <div className="card-body">
                            <div className="list-group flush">
                                <div className="list-group-item">
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items):
                                        $
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </div>
                                <div className="list-group-item">
                                    <div className='d-grid'>
                                        <button type="button" class="btn btn-primary"
                                            onClick={checkoutHandler}
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
    )
}