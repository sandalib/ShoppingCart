import { useState } from 'react';
import Axios from 'axios';

export default function CheckoutScreen() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [address, setAddress] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('/api/users/', {
        fname,
        lname,
        address,
      });
      window.alert('Order added');
    } catch (err) {
      window.alert(err);
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
