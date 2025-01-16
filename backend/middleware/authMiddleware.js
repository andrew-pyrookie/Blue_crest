const jwt = require ('jsonwebtoken');
const Admin = require ("../models/admin");

//check and verify token
const requireAuth = (req, res, next) => {
  const token = req.cookies.admin_jwt;
  
  if (token) {
    jwt.verify (token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log (err.message);
        res.redirect ('/signin');
      }
      else {
        //console.log (decodedToken);
        next();
      }
    })
  }
  else {
    res.redirect ('/signin');
  }
}

//check admin
const checkAdmin = (req, res, next) => {
  const token = req.cookies.admin_jwt;
  
  if (token) {
    jwt.verify (token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log (err.message);
        res.locals.admin = null;
        next();
      }
      else {
        console.log (decodedToken);
        const admin = await Admin.findById(decodedToken.id);
        res.locals.admin = admin;
        next();
      }
    })
  }
  else {
    res.locals.admin = null;
    next();
  }
}

module.exports = { requireAuth, checkAdmin };
