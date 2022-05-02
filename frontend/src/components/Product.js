import { Link } from "react-router-dom";

function Product(props) {
    const { product } = props;
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
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default Product;