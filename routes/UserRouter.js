import express from 'express';
import { getUser,updateUser,deleteUser,createUser,Connected } from '../controllers/UserController.js';

const router = express.Router();

// User routes

router.get('/users',(req,res)=>{
   
    getUser
} );


router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.post('/users',(req,res)=>{
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        const parsedBody =res.json(JSON.parse(body));
        createUser(parsedBody.get(username), parsedBody.get(email), parsedBody.get(password)
    ,(result) => {
        res.WriteHead(201);
        res.send("User created successfully");
        res.end();
    });

    });
});

router.get('/connected', Connected);

export default router;