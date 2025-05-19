import { check } from "express-validator";
import { validationResult } from "express-validator";

export const validatePost =[
    check("title", "El título es obligatorio.").not().isEmpty(),
    check("title", "El título no puede exceder los 80 caracteres.").isLength({ max: 80 }),
    check("description", "La descripción es obligatoria.").not().isEmpty(),
    check("description", "La descripción no puede exceder los 500 caracteres.").isLength({ max: 500 }),
    check("course", "El curso es obligatorio.").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];