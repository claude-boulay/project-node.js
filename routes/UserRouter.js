import express from 'express';
import fs from 'fs';
import { getUser,updateUser,deleteUser,createUser,Connected } from '../controllers/UserController.js';
import jwt from 'jsonwebtoken';
import { urlencoded } from 'express';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

const router = express.Router();

// User routes
router.post('/register',(req,res)=>{
    let parsedBody=req.body;
        createUser(parsedBody.username, parsedBody.email, parsedBody.password);
        res.status(201).send("User created successfully");
        res.end();
});

router.post('/login',(req,res)=>{
    let body=req.body;
    Connected(body.email, body.password).then((user) => {       
        if(user){
            const secret=fs.readFileSync(".env","utf8");
            const token=jwt.sign({id:user._id}, secret, { expiresIn: '1h' });
            res.status(200).send(token);
            res.end();  
        }else{
            res.status(401).send({error: "Invalid credentials"});
            res.end();
        }
        
    }).catch((err) => {
        res.status(401).send({error: "Invalid credentials", "admin":err.message});
        res.end();
    });
});

router.use(authMiddleware);
router.get('/:id',(req,res)=>{
    
    getUser(req.params.id).then((user) => {
        res.status(200).json(user);
        res.end();
    }).catch((err) => {
        res.status(404).send({error: "User not found"});
        res.end();
    });
} );

router.put('/:id',(req,res)=>{
    updateUser(req.params.id, req.body.username, req.body.email, req.body.password).then(() => {
        res.status(201).send("User updated successfully");
        res.end();
     }).catch((err) => {
         res.status(400).send({error: "Invalid data "});
         res.end();
     });
});

router.delete('/:id',(req,res)=>{
    deleteUser(req.params.id).then(() => {
        res.status(200).send("User deleted successfully");
        res.end();
    }).catch((err) => {
        res.status(404).send({error: "User not found",mesage:err.message});
        res.end();
    });
 });

export default router;