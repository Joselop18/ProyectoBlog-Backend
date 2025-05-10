import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        autopopulate: { select: 'name -_id' },
        required: true,
    },
    authorName: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["published", "draft", "archived"],
        default: "draft",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        autopopulate: true,
    }],
});

PostSchema.plugin(mongooseAutoPopulate);

export default model("Publicacione", PostSchema);