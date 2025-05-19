import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        autopopulate: true,
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

CommentSchema.plugin(mongooseAutoPopulate);

export default model("Comment", CommentSchema);