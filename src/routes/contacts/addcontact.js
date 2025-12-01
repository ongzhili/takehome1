const express = require('express');
const { addMetadataValidator } = require('../../middleware/metadatavalidator');
const dataService = require('../../services/dataservice');
const router = express.Router();

router.post('/', addMetadataValidator, async (req, res) => {
  const { email, name, phone } = req.body;

  const newContact = dataService.addContact(email, name, phone);
  console.log(`[ADD SUCCESS] Contact added: ${email}`);
  return res.status(201).json(newContact);
});

module.exports = router;