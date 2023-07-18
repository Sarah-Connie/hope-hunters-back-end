const { signup } = require('../controllers/users_signup');
const { generalUsersConfirmation } = require('../controllers/verify_general_user');
const { policeUsersConfirmation } = require('../controllers/verify_police_user');
const { login } = require('../controllers/users_login');
const { refreshJWT } = require('../controllers/refresh_JWT');
const { getUsers } = require('../controllers/users_all');

const express = require('express');
const usersRouter = express.Router();


usersRouter.get('/', getUsers)

usersRouter.post('/signup', signup);

usersRouter.put('/signup/general/confirmation/:email', generalUsersConfirmation);
usersRouter.put('/signup/police/confirmation/:email', policeUsersConfirmation);

usersRouter.post('/login', login)

usersRouter.put('/login/refresh-token', refreshJWT)

module.exports = usersRouter;