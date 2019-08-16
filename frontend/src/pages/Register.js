import React, {useState} from 'react';
import '../assets/css/bootstrap.css'
import './Login.css';

import api from '../services/api'

import logo from '../assets/images/logo2.svg'

export default function Register({history}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [display, setDisplay] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/user/register', {
            username,
            password,
            display
        });

        if (response.data['error']) {
            setError(response.data['error']);
        } else {
            history.push('/');
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center login-container">
            <img src={logo} alt="Series Advisor" className="logo"/>
            {error !== '' && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Your name"
                        value={display}
                        onChange={e => setDisplay(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
        
    );
}