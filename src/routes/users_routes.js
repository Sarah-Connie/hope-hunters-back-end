const { signup } = require('../controllers/users_signup');
const { generalUsersConfirmation } = require('../controllers/verify_general_user');
const { policeUsersConfirmation } = require('../controllers/verify_police_user');
const { login } = require('../controllers/users_login')

const express = require('express');
const { getLogger } = require('nodemailer/lib/shared');
const usersRouter = express.Router();


usersRouter.post('/signup', signup);

usersRouter.put('/signup/general/confirmation', generalUsersConfirmation);
usersRouter.put('/signup/police/confirmation', policeUsersConfirmation);

usersRouter.post('./login', login)

module.exports = usersRouter;