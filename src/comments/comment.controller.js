import Post from "../posts/post.model.js";
import Comment from "./comment.model.js";

export const saveComment = async (req, res) => {
    try {
        const { comment, postId, author } = req.body;

        if (!comment || !postId) {
            return res.status(400).json({
                success: false,
                message: "El comentario y el ID de la publicación son obligatorios",
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "No se encontró la publicación",
            });
        }

        const newComment = new Comment({
            comment,
            post: postId,
            author: author || "Anónimo",
        });

        await newComment.save();

        res.status(201).json({
            success: true,
            message: "Comentario creado exitosamente",
            comment: newComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al guardar el comentario",
            error: error.message,
        });
    }
};

export const getComment = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "El ID de la publicación es obligatorio",
            });
        }

        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });

        if (comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron comentarios para esta publicación",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentarios obtenidos exitosamente",
            comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios",
            error: error.message,
        });
    }
};