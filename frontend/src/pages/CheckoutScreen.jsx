import { useContext, useState } from 'react';
import Axios from 'axios';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [address, setAddress] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // const addUser = Axios.post('/api/users/');
      const addOrder = Axios.post('/api/orders/', {
        cartItems,
        customer: {
          fname,
          lname,
          address,
        },
      });
      await Promise.all([addOrder]);
      ctxDispatch({ type: 'CLEAR_CART' });
      toast.success('Order added successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div className="container small-container">
      <h1 className="my-3">Check out</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3" controlID="fname">
          <label>First Name</label>
          <input
            class="form-control"
            type="text"
            required
            value={fname}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3" controlID="lname">
          <label>Last Name</label>
          <input
            class="form-control"
            type="text"
            required
            value={lname}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3" controlID="address">
          <label>Shipping Address</label>
          <input
            class="form-control"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Pay now
          </button>
        </div>
      </form>
    </div>
  );
}
