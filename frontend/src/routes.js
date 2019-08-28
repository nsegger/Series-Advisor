import React from 'react';
import {Router, Route} from 'react-router-dom';
import history from './history';

import PrivateRoute from './components/PrivateRoute/index'
import AuthDataProvider from './pages/authContext'

import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dash from './pages/Dash.js';


export default function Routes() {
    return (
        <Router history={history}>
            <AuthDataProvider>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute path="/dash" exact component={Dash} />
            </AuthDataProvider>
        </Router>
    );
}