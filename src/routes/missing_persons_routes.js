const { getMissing } = require('../controllers/missing_all');
const { addMissingPerson } = require('../controllers/new_missing_person');

const { validateRequest } = require('../middlewares/validate_JWT');
const { getUserStatus } = require('../middlewares/userStatus');

const express = require('express');
const missingRouter = express.Router();


missingRouter.get('/', getMissing);

missingRouter.post('/new', validateRequest, getUserStatus, addMissingPerson);

module.exports = missingRouter;