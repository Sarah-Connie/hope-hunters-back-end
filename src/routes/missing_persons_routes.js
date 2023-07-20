const { getMissing } = require('../controllers/missing_all');

const { validateRequest } = require('../middlewares/validate_JWT');

const express = require('express');
const missingRouter = express.Router();


missingRouter.get('/', getMissing);

module.exports = missingRouter;