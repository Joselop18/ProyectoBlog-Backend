import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        autopopulate: true,
    },
    author: {
        type: String,
        required: true,
        default: "Anónimo",
        maxlength: 50,
    },
    }, {
    timestamps: true,
    versionKey: false
});

CommentSchema.plugin(mongooseAutoPopulate);

export default model("Comment", CommentSchema);