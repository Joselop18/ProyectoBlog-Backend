import mongoose from "mongoose";

const CoursesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: true
    },
    image:{
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Course", CoursesSchema);