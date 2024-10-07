import express from 'express';
import { createComments,deleteComment,updateComment,getCommentsByPostID } from '../controllers/CommentaireControllers.js';

const router = express.Router();

router.post('/:id/comments',(req,res)=>{
    createComments(req.body.text,req.body.Author,req.params.id)
   .then(comment=>res.status(201).send("Commentaire created successfully")).catch(err=>res.status(400).send({error: "Invalid data"}));
} );

router.put('/comments/:id',(req,res)=>{
    updateComment(req.params.id,req.body.text)
    .then(comment=>res.status(201).send("Commentaire updated successfully")).catch(err=>res.status(400).send({error: "Invalid data"}));
});

router.delete('/comments/:id',(req,res)=>{
    deleteComment(req.params.id).then(comment=>res.status(204).send("Commentaire deleted successfully")).catch(err=>res.status(404).send({error: "Commentaire not found"}));
    })
router.get('/posts/:id/comments',(req,res)=>{
    getCommentsByPostID(req.params.id).then(comments=>res.send(comments)).catch(err=>res.status(404).send({error: "Post not found"}));
})

export default router;