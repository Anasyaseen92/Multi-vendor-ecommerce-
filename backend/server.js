const app =require("./app");
const connectDatabase = require("./db/Database");
const errorMiddleware = require("./middleware/error");


app.use(errorMiddleware);
//Handling uncauhght exception

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);

})

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
      require("dotenv").config({
        path:"backend/config/.env"
    })
}
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection

process.on("unhandleRejection", (err) =>{
    console.log(`Shutting down the server for ${err.message}`)
    console.log(`shutting down the server for unhandle promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
});