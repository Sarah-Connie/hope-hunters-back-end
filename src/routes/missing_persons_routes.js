const { getMissing } = require('../controllers/missing_all');
const { addMissingPerson } = require('../controllers/new_missing_person');
const { updateMissing } = require('../controllers/missing_update');
const { deleteMissing } = require('../controllers/missing_delete');

const { validateRequest } = require('../middlewares/validate_JWT');
const { getUserStatus } = require('../middlewares/userStatus');

const express = require('express');
const missingRouter = express.Router();


missingRouter.get('/', getMissing);

missingRouter.post('/new', validateRequest, getUserStatus, addMissingPerson);

missingRouter.put('/update/:id', validateRequest, getUserStatus, updateMissing);

missingRouter.delete('/delete/:id', validateRequest, getUserStatus, deleteMissing);

module.exports = missingRouter;