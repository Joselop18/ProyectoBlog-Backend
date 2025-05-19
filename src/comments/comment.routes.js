import { Router } from "express";
import { saveComment, getComment, updateComment, deleteComment} from "./comment.controller.js";
import { validateComment } from "../middlewares/validate-comments.js";

const router = Router();

router.post(
    "/",
    validateComment,
    saveComment
);

router.get(
    "/:postId",
    getComment
);

router.put(
    "/:id",
    validateComment,
    updateComment
);

router.delete(
    "/:id",
    deleteComment
);

export default router;