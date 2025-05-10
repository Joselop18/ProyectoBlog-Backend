import { Router } from "express";
import { check } from "express-validator";
import {savePost, getPost, searchPost, deletePost, updatePost} from "./post.controller.js";
import { validatePost } from "../middlewares/validate-Post.js";
import { validarCampos } from "../middlewares/validar-campos.js";

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

router.put(
    "/posts/:id",
    validatePost, 
    updatePost
);

router.delete(
    "/posts/:id",
    [
        check("id", "No Es Un ID Valido").isMongoId(),
        validarCampos
    ],
    deletePost
);

router.get(
    "/posts/search",
    [
        check("id", "No Es Un ID Valido").isMongoId(),
        validarCampos
    ],
    searchPost
);

export default router;