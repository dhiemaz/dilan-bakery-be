const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://dimas:7WJuu9bwfIsnGMrn@cluster0.lxswgdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"));
    // await mongoose.connect('mongodb+srv://audidiandra31:krPlsb6OVlI2tA9g@cluster0.bl3mhew.mongodb.net/dilan-bakery').then(()=>console.log("DB Connected"));

}

module.exports = connectDB;
