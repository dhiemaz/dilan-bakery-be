// import express from "express"
const { addFood,listFood,removeFood } = require("../controllers/foodController.js")
// import multer from "multer"

const express = require("express")
const multer = require("multer")

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

// export default foodRouter;
module.exports = foodRouter;