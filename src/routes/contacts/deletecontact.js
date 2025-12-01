const express = require('express');
const { deleteMetadataValidator } = require('../../middleware/metadatavalidator');
const dataService = require('../../services/dataservice');
const router = express.Router();

router.delete('/:email', deleteMetadataValidator, async (req, res) => {
  const { email } = req.params;

  const deleted = dataService.deleteContact(email);
  
  if (!deleted) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.json(deleted);
});

module.exports = router;