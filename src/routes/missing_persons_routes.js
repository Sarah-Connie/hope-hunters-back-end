const { getMissing } = require('../controllers/missing_all');
const { addMissingPerson } = require('../controllers/new_missing_person');
const { updateMissing } = require('../controllers/missing_update');
const { deleteMissing } = require('../controllers/missing_delete');
const { searchAllMissing } = require('../controllers/search_all');
const { searchAmberAlert } = require('../controllers/missing_amber_alert');
const { searchUsersMissing } = require('../controllers/users_search_missing');
const { sortMissing } = require('../controllers/missing_sorting_options');

const { validateRequest } = require('../middlewares/validate_JWT');
const { getUserStatus } = require('../middlewares/userStatus');

const express = require('express');
const missingRouter = express.Router();


missingRouter.get('/', getMissing);

missingRouter.post('/new', validateRequest, getUserStatus, addMissingPerson);

missingRouter.put('/update/:id', validateRequest, getUserStatus, updateMissing);

missingRouter.delete('/delete/:id', validateRequest, getUserStatus, deleteMissing);

missingRouter.get('/search/:search', searchAllMissing);

missingRouter.get('/users/search/:search', validateRequest, getUserStatus, searchUsersMissing);

missingRouter.get('/amber-alerts', searchAmberAlert);

missingRouter.get('/sorted/:option', sortMissing);

module.exports = missingRouter;