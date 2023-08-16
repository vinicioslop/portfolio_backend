import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

User.pre('save', async function () {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
});

export default mongoose.model("User", User);