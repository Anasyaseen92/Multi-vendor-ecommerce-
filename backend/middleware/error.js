const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = error.statusCode || 500
    error.message= err.message || "Internal server Error"

    //wrong mongoDb id Error
    if(err.name === "CastError"){
        const message = `Resources not found with this id ..  invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // Duplicate key Error

 if(err.name === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    //wrong jwt error
     if(err.name === "JsonWebTokenError"){
        const message = `Your url is invalid please try again later`;
        err = new ErrorHandler(message,400);
    }

    //jwt expired

     if(err.name === "TokenExpiredError"){
        const message = `Your url is invalid please try again later`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    })
}