import express from 'express';
import fs from "fs";
import mongoose from 'mongoose';
import UserRouter from './routes/UserRouter.js';
import PostRouter from './routes/PostRouter.js';
import CommentaireRouter from './routes/CommentaireRouter.js';

const BdUrl="mongodb+srv://ClaudeB:Cyberbouffon5@cluster0.nc5na.mongodb.net/Blogify";
const app = express();
const Port =3000;

mongoose.connect(BdUrl).then((result) => {
    console.log("MongoDB connected");
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
});

app.use(express.json());

// Route pour la page d'accueil
app.get('/Blogify', (req, res) => {
    res.sendFile('index.html', { root: 'views' }); 
});
app.use("/Blogify/posts/", CommentaireRouter);
app.use("/Blogify/users/", UserRouter);
app.use("/Blogify/posts/", PostRouter);

app.use(function(req, res, next) {
    res.status(404).send('Error 404 : Sorry cant find that!');
});
