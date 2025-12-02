const { validateEmail, validatePhoneNumber } = require('../utils/validators');

function addMetadataValidator(req, res, next) {
  if (!req.body) {
      console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Request body is required`);
      return res.status(400).json({ error: "Request body is required" });
    }
  const { email, name, phone } = req.body;

  if (!email) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Email is required`);
    return res.status(400).json({ error: "Email is required" });
  }

  if (!name) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Name is required`);
    return res.status(400).json({ error: "Name is required" });
  }

  if (!phone) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Phone is required`);
    return res.status(400).json({ error: "Phone is required" });
  }

  if (!validateEmail(email)) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Invalid email format: ${email}`);
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!validatePhoneNumber(phone)) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Invalid phone number format: ${phone}`);
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  console.log(`[VALIDATION PASSED] ${req.method} ${req.path} - Email: ${email}`);
  next();
}

function deleteMetadataValidator(req, res, next) {
  if (!req.query) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Email query parameter is required`);
    return res.status(400).json({ error: "Email query parameter is required" });
  }

  const { email } = req.query;

  if (!email) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Email is required`);
    return res.status(400).json({ error: "Email is required" });
  }

  if (!validateEmail(email)) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Invalid email format: ${email}`);
    return res.status(400).json({ error: "Invalid email format" });
  }

  console.log(`[VALIDATION PASSED] ${req.method} ${req.path} - Email: ${email}`);
  next();
}

function getMetadataValidator(req, res, next) {
  if (!req.query) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Email query parameter is required`);
    return res.status(400).json({ error: "Email query parameter is required" });
  }

  const { email } = req.query;

  if (!email) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Email is required`);
    return res.status(400).json({ error: "Email is required" });
  }
  
  if (!validateEmail(email)) {
    console.log(`[VALIDATION FAILED] ${req.method} ${req.path} - Invalid email format: ${email}`);
    return res.status(400).json({ error: "Invalid email format" });
  }

  console.log(`[VALIDATION PASSED] ${req.method} ${req.path} - Email: ${email}`);
  next();
}

module.exports = { addMetadataValidator, deleteMetadataValidator, getMetadataValidator }