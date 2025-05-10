export const validatePost = (req, res, next) => {
    const { title, content, category, authorName } = req.body;

    if (!title || !content || !category || !authorName) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
    
    next();
};