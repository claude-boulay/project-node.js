import express from 'express';
import { 
    AddPost, 
    getAllPosts, 
    getPostById, 
    updatePostById, 
    deletePostById,
    likePost,
    unlikePost, 
    dislikePost, 
    undislikePost
} from '../controllers/PostController.js';

const router = express.Router();

// Route pour récupérer tous les post
router.get('/all', (req, res) => {
    getAllPosts(req, res); 
});

// Route pour récupérer un post par ID
router.get('/get/:id', (req, res) => {
    getPostById(req, res);
});

// Route pour créer un nouveau post
router.post('/add', async (req, res) => {
    const parsedBody = req.body; 

    try {
        // Appel à AddPost avec les données reçues
        const post = await AddPost(
            parsedBody.title,
            parsedBody.content,
            parsedBody.author,
            parsedBody.tags
        );
        res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error); 
        res.status(500).send({ message: "Failed to create post", error: error.message }); 
    }
});

// Route pour mettre à jour un post par ID
router.put('/update/:id', (req, res) => {
    updatePostById(req, res); 
});

// Route pour liker un post
router.put('/:id/like', likePost);

// Route pour déliker un post
router.put('/:id/unlike', unlikePost);

// Route pour disliker un post
router.put('/:id/dislike',  dislikePost);

// Route pour enlever un dislike d'un post
router.put('/:id/undislike',  undislikePost);

// Route pour supprimer un post par ID
router.delete('/delete/:id', (req, res) => {
    deletePostById(req, res); 
});
export default router;