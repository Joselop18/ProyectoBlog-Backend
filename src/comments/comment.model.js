import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    author: {
        type: String,
        required: true,
        default: "Anónimo",
        maxlength: 50,
    },
    status: {
        type: Boolean,
        default: true
    }
    }, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Comment", CommentSchema);