import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { getError } from "../utils";
import { Store } from "../Store";



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
}
function ProductScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
        navigate('/cart');
    };
    return (
        loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox >
        )
            :
            <div>
                <div className='row'>
                    <div className="col-md-6">
                        <img className="img-large" src={product.image} alt={product.name}></img>
                    </div>
                    <div className="col-md-3">
                        <div className="list-group flush">
                            <div className="list-group-item">
                                <Helmet>
                                    <title>{product.name}</title>
                                </Helmet>
                                <h1>{product.name}</h1>
                            </div>
                            <div className="list-group-item">
                                <div className='row'>
                                    <div className="col">Price:</div>
                                    <div className="col">${product.price}</div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="list-group flush">
                                    <div className="list-group-item">
                                        <div className='row'>
                                            <div className="col">Price:</div>
                                            <div className="col">${product.price}</div>
                                        </div>
                                    </div>
                                    <div className="list-group-item">
                                        <div className='row'>
                                            <div className="col">Status:</div>
                                            <div className="col">{product.countInStock > 0 ?
                                                <Badge bg="success">In Stock</Badge>
                                                :
                                                <Badge bg="danger">Unavailable</Badge>
                                            }</div>
                                        </div>
                                    </div>

                                    {product.countInStock > 0 && (
                                        <div className="list-group-item">
                                            <div className="d-grid">
                                                <button type="button" class="btn btn-primary" onClick={addToCartHandler}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ProductScreen;