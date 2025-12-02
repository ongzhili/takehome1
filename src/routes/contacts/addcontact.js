const express = require('express');
const { addMetadataValidator } = require('../../middleware/metadatavalidator');

function createAddContactRouter(dataService) {
  const router = express.Router();

  router.post('/', addMetadataValidator, async (req, res) => {
    const { email, name, phone } = req.body;

    const newContact = dataService.addContact(email, name, phone);

    if (newContact.exists) {
      return res.status(400).json({ error: 'Contact already exists' });
    }

    return res.status(201).json(newContact);
  });

  return router;
}

module.exports = createAddContactRouter;