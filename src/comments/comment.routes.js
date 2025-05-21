import { Router } from "express";
import { saveComment, getComments, updateComment, deleteComment, getCommentsById, getCommentsByPost} from "./comment.controller.js";
import { validateComment } from "../middlewares/validate-comments.js";

const router = Router();

router.post(
    "/:postId",
    validateComment,
    saveComment
);

router.get(
    "/",
    getComments
);

router.get(
    "/:id",
    getCommentsById
);

router.get(
    "/post/:postId",
    getCommentsByPost
);

router.put(
    "/:commentId",
    updateComment
);

router.delete(
    "/:id",
    deleteComment
);

export default router;