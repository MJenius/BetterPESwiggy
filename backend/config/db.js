import mongoose from "mongoose";

export const connectDB = async () => {
    (await mongoose.connect("mongodb+srv://MJenius:MJeniusonMongoDB@cluster0.fcj40.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("DB Connected")));
}