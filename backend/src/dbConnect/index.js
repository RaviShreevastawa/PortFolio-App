import mongoose from "mongoose";
import {DB_NAME} from "../../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`)
        console.log(`MongoDB Connect Successfully DBHost : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection Failed !", error)
    }
}

export {connectDB}