const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();
//const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });


//Middleware
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use('/auth',authRoutes);
