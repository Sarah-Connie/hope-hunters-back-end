const { getMissing } = require('../controllers/missing_all');
const { addMissingPerson } = require('../controllers/new_missing_person');
const { updateMissing } = require('../controllers/missing_update');

const { validateRequest } = require('../middlewares/validate_JWT');
const { getUserStatus } = require('../middlewares/userStatus');

const express = require('express');
const missingRouter = express.Router();


missingRouter.get('/', getMissing);

missingRouter.post('/new', validateRequest, getUserStatus, addMissingPerson);

missingRouter.put('/update/:id', validateRequest, getUserStatus, updateMissing);

module.exports = missingRouter;