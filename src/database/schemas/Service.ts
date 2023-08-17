import mongoose from "mongoose";

const Service = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imageAlt: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("Service", Service);