const mongoose = require("mongoose");
const { isEmail } = require ("validator");
const bcrypt = require ("bcrypt");

const userSchema = new mongoose.Schema (
    {
      fullname: {
        type: String,
        required:[ true, "Enter your name!"]
      },
      email: {
        type: String,
        required: [ true, "Enter an email address"],
        lowercase: [true, "Use lowercase for email address"],
        unique: true,
        validate: [isEmail, "Invalid email address!"]
      },
      password: {
        type: String,
        required: [ true, "Enter your password!"],
        minlength: [6, "Minimum length for password is 6 characters"]
      },
      createdAt: {
        type: Date,
        default: Date.now()        
      }
    }
  )
  
  //Hash password (fire a function before document is saved to DB)
  userSchema.pre ('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash (this.password, salt);
    
    next();
  })
  
  userSchema.statics.login = async function (email, password) {
    
    const user = await this.findOne({email});
    if (user) {
      const auth = await bcrypt.compare (password, user.password);
      
      if (auth) {
        return user;
      }
      throw Error("Incorrect password")
    }
    throw Error ("Incorrect email")
  }
  const User = mongoose.model ('user', userSchema);
  
  module.exports = User;