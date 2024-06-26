const { addFood, listFood, removeFood } = require("../controllers/foodController.js");
const express = require("express");
const upload = require("../config/upload.js");

const foodRouter = express.Router();

//image storage engine
// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })

// const upload = multer({storage:storage})

foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

module.exports = foodRouter;