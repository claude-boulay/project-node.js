import express from 'express';
import fs from "fs";
import mongoose from 'mongoose';
const BdUrl="mongodb+srv://ClaudeB:Cyberbouffon5@cluster0.nc5na.mongodb.net/Blogify";
const app = express();
const Port =3000;
mongoose.connect(BdUrl).then((result) => {
    console.log("MongoDB connected");
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
    
  });


  app.use(function(req, res, next) {
    res.status(404).send('Error 404 : Sorry cant find that!');
  });

