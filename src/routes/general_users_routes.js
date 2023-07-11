const { generalUsersSignup } = require('../controllers/general_users_signup');
const { generalUsersConfirmation } = require('../controllers/verify_user');

const express = require('express');
const generalUsersRouter = express.Router();


generalUsersRouter.post('/signup', generalUsersSignup);

generalUsersRouter.put('/signup/confirmation', generalUsersConfirmation);


module.exports = generalUsersRouter;