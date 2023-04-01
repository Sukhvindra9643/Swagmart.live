const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary");
const http = require('http')
var os = require("os");
var host = os.hostname();
//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shuting down the server due to Uncaught Exception");
    process.exit(1);
})
// config

if(process.env.NODE_ENV !== "PRODUCTION"){   
    require("dotenv").config({ path: "config/config.env" });
}

// Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
app.get("*",(req,res)=>{
    res.sendFile(__dirname,"/frontend/public/index.html")
})
const server = app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is working on ${host}:${process.env.PORT}`);
})

// unhandled promise rejection
process.on("unhandledRejection",err => {
    console.log(`Error : ${err.message}`);
    console.log("Shuting down the server due to unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    });
});