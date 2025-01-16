const jwt = require ("jsonwebtoken");

// Tokens
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign ({ id }, process.env.SECRET, { expiresIn: maxAge })
}

// Error handling
const handleErrors = (err) => {
  console.log (err.message, err.code);

  let errors = { email: '', password: ''};
  
  if (err.message === "Incorrect email") {
    errors.fullname = "Invalid email"
  }
  
   if (err.message === "Incorrect password") {
    errors.password = "Wrong password"
  }
  
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      
      errors [properties.path] = properties.message;
    })
  }

  return errors;
}



module.exports.signup_post = async (req, res) => {

}

module.exports.signin_post = async (req, res) => {

}

module.exports.logout_get = async (req, res) => {
 
}