/*
## Documentation de l'API

Pour accéder à la documentation de l'API, ouvrez votre navigateur et allez à l'URL suivante : 

http://localhost:3000/api-docs/#/

Assurez-vous que le serveur est en cours d'exécution avant d'accéder à cette URL.
*/

import express from 'express';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import UserRouter from './routes/UserRouter.js';
import PostRouter from './routes/PostRouter.js';
import CommentaireRouter from './routes/CommentaireRouter.js';
import { authMiddleware } from './middlewares/authMiddlewares.js';

const BdUrl="mongodb+srv://ClaudeB:Cyberbouffon5@cluster0.nc5na.mongodb.net/Blogify";
const app = express();
const Port = 3000;

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Blogify API",
            version: "1.0.0",
            description: "Documentation de l'API pour la plateforme Blogify.",
            contact: {
                name: "Steven Coublant",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/Blogify", 
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(BdUrl).then((result) => {
    console.log("MongoDB connected");
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
});

app.use(express.json());

// Route pour la page d'accueil
app.get('/Blogify', (req, res) => {
    res.sendFile('index.html', { root: 'views' }); 
});

// Route pour les actions sur les utilisateurs
app.use("/Blogify/users/", UserRouter);

app.use(authMiddleware);

// Route pour les actions sur les posts (ainsi que les commentaires)
app.use("/Blogify/posts/", PostRouter);
app.use("/Blogify/posts/", CommentaireRouter);

app.use(function(req, res, next) {
    res.status(404).send('Error 404 : Sorry cant find that!');
});