import Post from "./post.model.js";

export const savePost = async (req, res) => {
    try {
        const { title, description, course } = req.body;

        if (!title || !description || !course) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const newPost = new Post({
            title,
            description,
            course,
        });

        const savedPost = await newPost.save();

        const populatedPost = await Post.findById(savedPost._id)
            .populate("course", "name description -_id")
            .populate("comments", "comment author -_id")
            .lean();

        res.status(201).json(populatedPost);
    } catch (error) {
        console.error("No se pudo Guardar esta Publicacion ", error);
        res.status(500).json({ 
            message: "Hubo un error interno en el Servicio",
            error: error.message,
            details: error.errors
        });
    }
};

export const getPost = async(req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };
    
    try {
        const posts = await Post.find(query)
            .populate("course", "name description -_id")
            .populate("comments", "comment author -_id")
            .skip(Number(desde))
            .limit(Number(limite))
            .lean();

        const total = await Post.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            posts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: error.message
        });
    }
};
