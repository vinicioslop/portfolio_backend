import mongoose from "mongoose";

const Project = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    technologies: [{
        type: String,
        required: true,
    }],
    githubUrl: {
        type: String,
        required: true,
        default: ""
    },
    liveUrl: {
        type: String,
        required: true,
        default:""
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

export default mongoose.model("Project", Project);