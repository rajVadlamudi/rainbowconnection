import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config";

export const connectDB = async () => {
    if(!MONGO_URI){
        console.log('MONGO_URI is not defined in the URI file');
        process.exit(1);
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected".blue.underline.bold);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}