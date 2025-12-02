const express = require('express');
const { getMetadataValidator } = require('../../middleware/metadatavalidator');

function createGetContactRouter(dataService) {
  const router = express.Router();

  router.get('/', getMetadataValidator, async (req, res) => {
    const { email } = req.query;

    const contact = dataService.getContact(email);

    if (!contact) {
      console.log(`[GET FAILED] Contact with email ${email} not found`);
      return res.status(404).json({ error: "Contact not found" });
    }

    console.log(`[GET SUCCESS] Contact retrieved: ${email}`);
    return res.json(contact);
  });

  return router;
}

module.exports = createGetContactRouter;