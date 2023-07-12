const { signup } = require('../controllers/users_signup');
const { generalUsersConfirmation } = require('../controllers/verify_general_user');
const { policeUsersConfirmation } = require('../controllers/verify_police_user');

const express = require('express');
const usersRouter = express.Router();


usersRouter.post('/signup', signup);

usersRouter.put('/signup/general/confirmation', generalUsersConfirmation);
usersRouter.pup('/signup/police/confirmation', policeUsersConfirmation);


module.exports = usersRouter;