const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require ("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();

//ENV setup
dotenv.config();

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(cookieParser);


//Database and Server connection
mongoose.connect(process.env.DB_URI)
  .then((result) => {
    //Start server
    console.log("Connected to database")
    const port = process.env.PORT || 8080

    app.listen(port, ()=> {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err))