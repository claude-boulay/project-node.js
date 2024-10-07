import express from 'express';
import { getUser,updateUser,deleteUser,createUser,Connected } from '../controllers/UserController.js';

const router = express.Router();

// User routes

router.get('/users',(req,res)=>{
   
    getUser
} );


router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.post('/register',(req,res)=>{
    let body = "";
    let parsedBody=req.body;
   
         createUser(parsedBody.username, parsedBody.email, parsedBody.password
    ,(result) => {
         res.WriteHead(201);
         res.send("User created successfully");
         res.end();
     });

});

router.get('/connected', Connected);

export default router;