import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        autopopulate: true,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        autopopulate: true,
        required: true,
    }],
    status: {
        type: Boolean,
        default: true
    }
});

PostSchema.plugin(mongooseAutoPopulate);

export default model("Post", PostSchema);