const jwt = require ("jsonwebtoken");

// Tokens
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign ({ id }, process.env.SECRET, { expiresIn: maxAge })
}

module.exports.signup_post = async (req, res) => {

}

module.exports.signin_post = async (req, res) => {

}

module.exports.logout_get = async (req, res) => {
 
}