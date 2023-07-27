const { signup } = require('../controllers/users_signup');
const { generalUsersConfirmation } = require('../controllers/verify_general_user');
const { policeUsersConfirmation } = require('../controllers/verify_police_user');
const { login } = require('../controllers/users_login');
const { refreshJWT } = require('../controllers/refresh_JWT');
const { getUsers } = require('../controllers/users_all');
const { updateUsers } = require('../controllers/users_update');
const { deleteUsers } = require('../controllers/users_delete');
const { getUsersMissing } = require('../controllers/users_all_missing');

const { validateRequest } = require('../middlewares/validate_JWT');
const { getUserStatus } = require('../middlewares/userStatus');

const express = require('express');
const usersRouter = express.Router();


usersRouter.get('/', getUsers);

usersRouter.post('/signup', signup);

usersRouter.put('/signup/general/confirmation/:email', generalUsersConfirmation);
usersRouter.put('/signup/police/confirmation/:email', policeUsersConfirmation);

usersRouter.post('/login', login);

usersRouter.put('/login/refresh-token', refreshJWT);

usersRouter.put('/update', validateRequest, updateUsers);

usersRouter.delete('/delete', validateRequest, deleteUsers);

usersRouter.get('/missing/all', validateRequest, getUserStatus, getUsersMissing);

module.exports = usersRouter;