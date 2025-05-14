import { Router } from "express";
import { savePost, getPost } from "./post.controller.js";
import { validatePost } from "../middlewares/validate-Post.js";

const router = Router();

router.post(
    "/",
    validatePost,
    savePost
);

router.get(
    "/",
    getPost
);

export default router;