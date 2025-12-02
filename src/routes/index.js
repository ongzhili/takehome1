const express = require('express');
const router = express.Router();

const createPostContactRouter = require('./contacts/addcontact');
const createGetContactRouter = require('./contacts/getcontact');
const createDeleteContactRouter = require('./contacts/deletecontact');
const DataService = require('../services/dataservice');
const dataService = new DataService();  

router.use('/health', require('./health'));

router.use('/addContact', createPostContactRouter(dataService));
router.use('/getContact', createGetContactRouter(dataService));
router.use('/deleteContact', createDeleteContactRouter(dataService));

module.exports = router;