import React, { useRef } from 'react';
import { useAuthDataContext } from './authContext';
import {authApi} from '../services/api';
import { Redirect } from 'react-router-dom';

import '../assets/css/bootstrap.css';
import { Container } from '../styles/login';
import logo from '../assets/images/logo2.svg';

import history from '../history';

export default function Login() {
    const username = useRef();
    const password = useRef();
    //const [warn, setWarn] = useState('');
    
    const { user, error, onLogin } = useAuthDataContext();


    async function handleSubmit(e) {
        e.preventDefault();

        const formContent = {
            username: username.current.value,
            password: password.current.value,
        }

        authApi.authenticate(formContent).then(onLogin)
        
    }
            
    return (
        <Container>
            { user && <Redirect to='/dash'/> }
            <img src={logo} alt="Series Advisor"/>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Username*"
                        ref={username}                        
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-control"
                        type="password"
                        placeholder="Password*"
                        ref={password}
                    />
                </div>
                <button 
                    type="button" 
                    onClick={e => history.push('/register')} 
                    className="btn btn-dark reg-btn">
                    Register
                </button>
                <button type="submit" className="btn btn-primary login-btn">Login</button>
            </form>
        </Container>
    );
}