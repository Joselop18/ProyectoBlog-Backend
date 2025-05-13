import Post from "./post.model";

export const savePost = async (req, res) => {
    try {
        const { title, content, category, authorName } = req.body;

        if (!title || !content || !category || !authorName) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const newPost = new Post({
            title,
            content,
            category,
            authorName,
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error("No se pudo Guardar esta Publicacion ", error);
        res.status(500).json({ message: "Hubo un error interno en el Servicio" });
    }
};

export const getPost = async (req, res) => {
    try {
        const { category } = req.query;

        const filters = {};
        if (category) {
            filters.category = category;
        }

        const posts = await Post.find(filters)
            .populate("category", "name -_id")
            .populate("comments");

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};