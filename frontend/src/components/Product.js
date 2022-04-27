// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
    const { product } = props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
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

    return (
        <div className="card">
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product.slug}`}>
                    <h4 className='card-title'>
                        {product.name}
                    </h4>
                </Link>
                <h5 className='card-text'>${product.price}</h5>
                {product.countInStock === 0 ?
                    <button type="submit" className="btn btn-light" disabled>
                        Out of stock
                    </button>
                    :
                    <button type="submit" className="btn btn-primary" onClick={() => addToCartHandler(product)}>
                        Add to cart
                    </button>
                }

            </div>
        </div>);
}

export default Product;