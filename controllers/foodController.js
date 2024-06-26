const foodModel = require("../models/foodModel.js");
const cloudinary = require("cloudinary").v2;
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        stream.end(buffer);
    });
};

//add food item
const addFood = async (req, res) => {

    // Check if file exists
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is missing' });
    }

    try {
        const result = await uploadImageToCloudinary(req.file.buffer);
        let image_filename = result.secure_url;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        console.log("Food Added :", food);
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

module.exports = { addFood, listFood, removeFood }