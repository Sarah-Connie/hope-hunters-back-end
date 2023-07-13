const { signup } = require('../controllers/users_signup');
const { generalUsersConfirmation } = require('../controllers/verify_general_user');
const { policeUsersConfirmation } = require('../controllers/verify_police_user');
const { login } = require('../controllers/users_login');
const { refreshJWT } = require('../controllers/refresh_JWT');

const express = require('express');
const usersRouter = express.Router();


usersRouter.post('/signup', signup);

usersRouter.put('/signup/general/confirmation/:email', generalUsersConfirmation);
usersRouter.put('/signup/police/confirmation/:email', policeUsersConfirmation);

usersRouter.post('./login', login)

usersRouter.put('./login/refresh-token/:jwt', refreshJWT)

module.exports = usersRouter;