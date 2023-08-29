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
        required: false,
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
    projectType: {
        type: String,
        required: true,
        default: "small-project"
        // TYPES: small-project, complete-project
    },
    working: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("Project", Project);