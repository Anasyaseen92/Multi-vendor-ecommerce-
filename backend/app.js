const express = require("express");
//const ErrorHandler = require("./utils/ErrorHandler");
const errorMiddleware = require("./middleware/error"); // ✅ correct
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


//app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
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
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupoun = require("./controller/coupounCode");

app.use("/api/v2/user", user);
app.use("/api/v2/seller", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupoun);

app.use(errorMiddleware);
module.exports = app;