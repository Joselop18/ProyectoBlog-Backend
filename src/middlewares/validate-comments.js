import { check } from "express-validator";
import { validationResult } from "express-validator";

export const validateComment = [
    check("postId", "El id del post es obligatorio.").not().isEmpty(),
    check("postId", "El id del post no es válido.").isMongoId(),
    check("description", "La descripción es obligatoria.").not().isEmpty(),
    check("description", "La descripción no puede exceder los 500 caracteres.").isLength({ max: 500 }),
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];