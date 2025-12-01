function validateEmail(email) {
  const trimmedEmail = email.trim();

  // RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }

  return true;
};

function validatePhoneNumber(phoneNumber) {

  const digitCheckRegex = /^\d+$/;
  if (!digitCheckRegex.test(phoneNumber)) {
    return false;
  }

  return true;

}


module.exports = { validateEmail, validatePhoneNumber}