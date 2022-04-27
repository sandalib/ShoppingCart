import React, { useContext, useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

function ShippingAddressScreen() {
    const navigate = useNavigate();
    const { state } = useContext(Store);

    const { userInfo, } = state;

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo, navigate])
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <div className='container small-container'>
                <h1 className="my-3">Shipping Address</h1>
                <form onSubmit={submitHandler}>
                    <div className="form-group mb-3" controlId="fullName">
                        <label>Full Name</label>
                        <input class="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3" controlId="address">
                        <label>Address</label>
                        <input class="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3" controlId="city">
                        <label>City</label>
                        <input class="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3" controlId="postalCode">
                        <label>Postal Code</label>
                        <input class="form-control"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <button type="submit" class="btn btn-primary">
                            Continue
                        </button>

                    </div>
                </form>
            </div>

        </div>

    );
}

export default ShippingAddressScreen;