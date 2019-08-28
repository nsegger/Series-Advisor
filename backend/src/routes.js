const express = require('express');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

routes.post('/user/register', UsersController.store);
routes.post('/user/edit', UsersController.update);
routes.post('/user')
routes.post('/user/auth', LoginController.store);

module.exports = routes;