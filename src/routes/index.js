const express = require('express');
const router = express.Router();

router.use('/health', require('./health'));

router.use('/addContact', require('./contacts/addcontact'));
router.use('/getContact', require('./contacts/getcontact'));
router.use('/deleteContact', require('./contacts/deletecontact'));

module.exports = router;