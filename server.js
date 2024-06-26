const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.js")
const foodRouter = require("./routes/foodRoute.js")
const userRouter = require("./routes/userRoute.js")
const cartRouter = require("./routes/cartRoute.js")
const orderRouter = require("./routes/orderRoute.js")

const app = express()
const port = 4000

// const corsOptions = {
//     origin: ["https://dilan-bakery-admin.vercel.app", "http://localhost:5173"],
//     optionsSuccessStatus: 200
// }

//middleware
app.use(express.json())
// app.use(cors(corsOptions))

//db connection
connectDB()

//api endpoint
app.use("/api/food", foodRouter)
app.use("/api/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on port : ${port}`)
})

module.exports = app;
