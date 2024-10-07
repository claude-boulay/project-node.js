import express from 'express';
import { getUser,updateUser,deleteUser,createUser,Connected } from '../controllers/UserController.js';
import { urlencoded } from 'express';

const router = express.Router();

// User routes

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


router.post('/register',(req,res)=>{
    let parsedBody=req.body;
   
        createUser(parsedBody.username, parsedBody.email, parsedBody.password);
        res.status(201).send("User created successfully");
        res.end();
         

});

router.post('/login',(req,res)=>{
    let body=req.body;
    Connected(body.email, body.password).then((user) => {
        console.log(user);
        if(user){
          res.status(200).send("connexion successful");
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

export default router;