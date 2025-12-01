const express = require('express');
const { getMetadataValidator } = require('../../middleware/metadatavalidator');
const dataService = require('../../services/dataservice');
const router = express.Router();

router.get('/:email', getMetadataValidator, async (req, res) => {
  const { email } = req.params;

  const contact = dataService.getContact(email);
  
  if (!contact) {
    console.log(`[GET FAILED] Contact with email ${email} not found`);
    return res.status(404).json({ error: "Contact not found" });
  }

  console.log(`[GET SUCCESS] Contact retrieved: ${email}`);
  res.json(contact);
});

module.exports = router;