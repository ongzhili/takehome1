const express = require('express');
const { deleteMetadataValidator } = require('../../middleware/metadatavalidator');

function createDeleteContactRouter(dataService) {
  const router = express.Router();

  router.delete('/', deleteMetadataValidator, async (req, res) => {
    const { email } = req.query;

    const deleted = dataService.deleteContact(email);

    if (!deleted) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.json(deleted);
  });

  return router;
}

module.exports = createDeleteContactRouter;