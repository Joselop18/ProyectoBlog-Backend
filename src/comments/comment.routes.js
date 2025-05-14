import { Router } from "express";
import { saveComment, getComment, updateComment, deleteComment} from "./comment.controller.js";

const router = Router();

router.post(
    "/", 
    saveComment
);

router.get(
    "/comments/:postId",
    getComment
);

router.put(
    "/comments/:id",
    updateComment
);

router.delete(
    "/comments/:id",
    deleteComment
);

export default router;