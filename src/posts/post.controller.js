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
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, authorName } = req.body;

        if (!title || !content || !category || !authorName) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, category, authorName, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Publicación no encontrada." });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error al actualizar la publicación:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Publicación no encontrada." });
        }

        res.status(200).json({ message: "Publicación eliminada exitosamente." });
    } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const searchPost = async (req, res) => {
    try {
        const { query, category, authorName } = req.query;
        const filters = {};

        if (query) {
            filters.$or = [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } },
            ];
        }

        if (category) {
            filters.category = category;
        }

        if (authorName) {
            filters.authorName = { $regex: authorName, $options: "i" };
        }

        const posts = await Post.find(filters).populate("category", "name -_id").populate("comments");
        res.status(200).json(posts);

    } catch (error) {
        console.error("Error al buscar publicaciones:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};