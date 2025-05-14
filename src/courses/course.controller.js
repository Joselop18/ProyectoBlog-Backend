import Course from "./course.model.js";

export const crearCourseTaller = async () => {
    try {
        const tallerExistente = await Course.findOne({ name: "Taller" });
        if (!tallerExistente) {
            const taller = new Course({
                name: "Taller",
                description: "En este curso se ve lo que es la logica de un proyecto",
                image: "url",
            });
            await taller.save(); 
            console.log("Se creo el curso Taller correctamente");
        } else {
            console.log("Este curso Taller ya existe");
        }
    } catch (error) {
        console.error("No se pudo crear el curso Taller: ", error);
    }
};

export const crearCourseTecnologia = async () => {
    try {
        const tecnologiaExistente = await Course.findOne({ name: "Tecnologia" });
        if (!tecnologiaExistente) {
            const tecnologia = new Course({
                name: "Tecnologia",
                description: "En este curso se aprende lo teorico",
                image: "url",
            });
            await tecnologia.save(); 
            console.log("Se creo el curso Tecnologia correctamente");
        } else {
            console.log("Este curso Tecnologia ya existe");
        }
    } catch (error) {
        console.error("No se pudo crear el curso Tecnologia: ", error);
    }
};

export const crearCoursePracticaSup = async () => {
    try {
        const practicaSupExistente = await Course.findOne({ name: "Practica Supervisada" });
        if (!practicaSupExistente) {
            const practicaSup = new Course({
                name: "Practica Supervisada",
                description: "En este curso se hacen trabajos practicos",
                image: "url",
            });
            await practicaSup.save(); 
            console.log("Se creo el curso Practica Supervisada correctamente");
        } else {
            console.log("Este curso Practica Supervisada ya existe");
        }
    } catch (error) {
        console.error("No se pudo crear el curso Practica Supervisada: ", error);
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron cursos",
            });
        }

        res.status(200).json({
            success: true,
            message: "Cursos obtenidos exitosamente",
            courses,
        });
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};