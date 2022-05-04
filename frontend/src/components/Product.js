import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

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
                <img src={product.image} alt={product.name} className='card-img-top' />
            </Link>
            <div className="card-body">
                <div className="card-title">
                    <Link to={`/product/${product.slug}`}>
                        <h4>{product.name}</h4>
                    </Link>
                </div>
                <div className="card-text">
                    <p>
                        <strong>LKR {product.price}</strong>
                    </p>
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
            </div>
        </div>
    );
}

export default Product;