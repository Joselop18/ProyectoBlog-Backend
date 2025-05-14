'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from "morgan";
import { dbConnection } from './mongo.js';
import { crearCourseTaller, crearCourseTecnologia, crearCoursePracticaSup } from "../src/courses/course.controller.js";
import postRoutes from "../src/posts/post.routes.js"
import commentRoutes from "../src/comments/comment.routes.js"
import courseRoutes from "../src/courses/course.routes.js"

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}

const configurarRutas = (app) =>{
        app.use("/blog/v1/posts", postRoutes);
        app.use("/blog/v1/comments", commentRoutes);
        app.use("/blog/v1/courses", courseRoutes);

}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexion Exitosa Con La Base De Datos");
    } catch (error) {
        console.log("Error Al Conectar Con La Base De Datos", error);
    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    await conectarDB();
    await crearCourseTaller();
    await crearCourseTecnologia();
    await crearCoursePracticaSup();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}