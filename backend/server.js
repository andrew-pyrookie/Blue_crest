const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require ("cookie-parser");

const app = express();

//Database connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log("Connected to database"))
.catch((err) => console.log(err))

//Middleware
app.use(morgan("dev"));
app.use(express.static("./public"))
app.use(authRoutes);
app.use(express.json());
app.use(cookieParser);

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log("App listening on port 3000");
});
