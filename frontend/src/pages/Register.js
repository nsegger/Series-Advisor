import React, { useState, useRef } from 'react';
import { Container } from '../styles/login';
import {authApi} from '../services/api';

import '../assets/css/bootstrap.css';
import logo from '../assets/images/logo2.svg';

import history from '../history';


export default function Register() {
    const username = useRef();
    const password = useRef();
    const display = useRef();
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const formContent = {
            username: username.current.value,
            password: password.current.value,
            display: display.current.value
        }

        const response = authApi.register(formContent)

        if (response['error']) {
            setError(response['error']);
        } else {
            history.push('/');
        }
    }

    return (
        <Container>
            <img src={logo} alt="Series Advisor" className="logo"/>
            {error !== '' && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Your name"
                        ref={display}
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Username"
                        ref={username}
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="password" 
                        placeholder="Password"
                        ref={password}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </Container>
        
    );
}