import express from "express"
import cookieParser from "cookie-parser"
import { urlencoded } from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import productRoute from "./routes/product.route.js"
import messageRoute from "./routes/message.route.js"
import cropRoute from "./routes/crop.route.js"
import { app, server } from "./socket/socket.js";
import passport from "./utils/passport.js"
// const app = express()

import authRoutes from "./routes/googleAuth.route.js"

const PORT = process.env.PORT || 9000


app.use(express.json())
app.use(cookieParser())
passport(app)
app.use(urlencoded({extended:true}))
// const corsOptions = {
//     origin : process.env.URL,
//     credentials:true,
// }
// app.use(cors(corsOptions))

// CORS options with credentials and origin from env
const corsOptions = {
    origin: process.env.URL || "http://localhost:5173",  // Ensure this matches your front-end URL
    credentials: true,
  };
  app.use(cors(corsOptions));  // Add CORS middleware
  

  // app.options("*", cors(corsOptions));  // Handle preflight requests for all routes

// Log incoming requests to debug if they are reaching the backend
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
//   console.log(res)
  next();
});


app.use("/ekheti/v1/user", userRoute)
app.use("/ekheti/v1/post", postRoute)
app.use("/ekheti/v1/product",productRoute)
app.use("/ekheti/v1/message",messageRoute)
app.use("/ekheti/v1/crop",cropRoute)
app.use("/ekheti/v1/g-auth",authRoutes)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port : ${PORT}`);
    })
    })