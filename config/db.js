// import mongoose from "mongoose";

const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://audidiandra31:krPlsb6OVlI2tA9g@cluster0.bl3mhew.mongodb.net/dilan-bakery').then(()=>console.log("DB Connected"));

}

module.exports = connectDB;
