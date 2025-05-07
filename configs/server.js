'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from "morgan";
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js'
import postRoutes from "../src/posts/post.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"
import categoryRoutes from "../src/categories/category.routes.js";

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) =>{
/*        
        app.use("/postSystem/v1/auth", authRoutes);
        app.use("/postSystem/v1/users", userRoutes);
        app.use("/postSystem/v1/posts", postRoutes);
        app.use("/postSystem/v1/comments", commentRoutes);
        app.use("/postSystem/v1/categories", categoryRoutes);
*/
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexion Exitosa Con La Base De Datos");
        await initializeCategories();
    } catch (error) {
        console.log("Error Al Conectar Con La Base De Datos", error);
    }
}

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}