import Post from "../posts/post.model.js";
import Comment from "./comment.model.js";

export const saveComment = async (req, res) => {
    try {
        const { comment,  author } = req.body;
        const { postId } = req.params;	

        if (!comment || !postId) {
            return res.status(400).json({
                success: false,
                message: "El comentario y la publicación son obligatorios",
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
            post,
            author: author || "Anónimo",
        });

        await newComment.save();

        await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment._id } },
        { new: true }
        );

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

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 }).populate({
            path: "post",
            select: "title description course",
            populate: {
                path: "course",
                select: "name description"
            }
        });

        if (comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron comentarios",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentarios obtenidos exitosamente",
            comments,
        });
    } catch (error) {
        console.error("Error al obtener los comentarios:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios",
            error: error.message,
        });
    }
};

export const getCommentsById = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: "El ID del comentario es obligatorio",
            });
        }

        const comment = await Comment.findById(commentId).populate({
            path: "post",
            select: "title description course",
            populate: {
                path: "course",
                select: "name description"
            }
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el comentario",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentario obtenido exitosamente",
            comment,
        });
    } catch (error) {
        console.error("Error al obtener el comentario:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el comentario",
            error: error.message,
        });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "El ID de la publicación es obligatorio",
            });
        }

        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: -1 })
            .populate({
                path: "post",
                select: "title description course",
                populate: {
                    path: "course",
                    select: "name description"
                }
            });

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
        console.error("Error al obtener los comentarios por publicación:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios por publicación",
            error: error.message,
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment, author } = req.body;

        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: "El ID del comentario es obligatorio",
            });
        }

        const existingComment = await Comment.findById(commentId);
        if (!existingComment) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el comentario",
            });
        }
        
        if (comment) existingComment.comment = comment;
        if (author) existingComment.author = author;
        
        const updatedComment = await existingComment.save();

        res.status(200).json({
            success: true,
            message: "Comentario actualizado exitosamente",
            comment: updatedComment,
        });
    } catch (error) {
        console.error("Error al actualizar el comentario:", error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: error.message,
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: "El ID del comentario es obligatorio",
            });
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el comentario",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentario eliminado exitosamente",
            comment: deletedComment,
        });
    } catch (error) {
        console.error("Error al eliminar el comentario:", error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: error.message,
        });
    }
};