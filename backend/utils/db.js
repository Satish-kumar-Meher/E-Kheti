import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({})


const URI = process.env.MONGODB_URI

// mongoose.connect(URI)

 const connectDB = async () => {
    try{
       await mongoose.connect(URI) 
       console.log("connection succesful to DB")
    } catch (error){
        console.error("database connection failed")
        process.exit(0)
    }
}
export default connectDB