import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';


export default function SignupScreen() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await Axios.post('/api/users/signup', {
                name,
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
    }
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div className="container small-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group mb-3" controlID="name">
                    <label>Name</label>
                    <input class="form-control"  onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group mb-3" controlID="email">
                    <label>Email</label>
                    <input class="form-control"  type="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-3" controlID="password">
                    <label>Password</label>
                    <input class="form-control"  type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group mb-3" controlID="confirmpassword">
                    <label>Confirm Password</label>
                    <input class="form-control"  type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </form>
        </div>
    )
}