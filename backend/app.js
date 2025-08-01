const express = require("express");
//const ErrorHandler = require("./utils/ErrorHandler");
const errorMiddleware = require("./middleware/error"); // ✅ correct
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));

//config

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"    })
}

//import routes
const user = require("./controller/user");

app.use("/api/v2/user", user);

app.use(errorMiddleware);
module.exports = app;