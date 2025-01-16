const jwt = require ("jsonwebtoken");
const User = require ("../models/users");

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


//Sign-up
module.exports.signup_post = async (req, res) => {
  console.log (req.body);
  const { fullname, email, password } = req.body;
  
  try {
    const user = await User.create({ fullname, email, password });
    const token = createToken(user._id);
    res.cookie ('jwt', token, {httpOnly: true, expiresIn: maxAge * 1000});
    res.status(201).json({user: user._id})
  }
  catch (err) {
    const errors = handleErrors (err);
    res.status(400).json({errors});
  } 
}

//Sign-in
module.exports.signin_post = async (req, res) => {
  console.log (req.body);
  
  const { email, password } = req.body;
  
  try{ 
    const user = await User.login (email, password);
    const token = createToken (user._id);

    res.cookie ('jwt', token, {httpOnly: true, expiresIn: maxAge * 1000});
    res.status(200).json ({user: user._id})
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.logout_get = async (req, res) => {
 
}