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

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gestion des publications
 */

/**
 * @swagger
 * /Blogify/posts/all:
 *   get:
 *     summary: Récupérer toutes les publications
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Liste de toutes les publications
 */
router.get('/all', (req, res) => {
    getAllPosts(req, res); 
});

/**
 * @swagger
 * /Blogify/posts/get/{id}:
 *   get:
 *     summary: Récupérer une publication par ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publication à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la publication
 *       404:
 *         description: Publication non trouvée
 */
router.get('/get/:id', (req, res) => {
    getPostById(req, res);
});

/**
 * @swagger
 * /Blogify/posts/add:
 *   post:
 *     summary: Créer une nouvelle publication
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Publication créée avec succès
 *       500:
 *         description: Échec de la création de la publication
 */
router.post('/add', async (req, res) => {
    const parsedBody = req.body; 

    try {
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

/**
 * @swagger
 * /Blogify/posts/update/{id}:
 *   put:
 *     summary: Mettre à jour une publication par ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publication à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Publication mise à jour avec succès
 *       404:
 *         description: Publication non trouvée
 */
router.put('/update/:id', (req, res) => {
    updatePostById(req, res); 
});

/**
 * @swagger
 * /Blogify/posts/{id}/like:
 *   put:
 *     summary: Liker une publication
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publication à liker
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publication likée avec succès
 */
router.put('/:id/like', likePost);

/**
 * @swagger
 * /Blogify/posts/{id}/unlike:
 *   put:
 *     summary: Déliker une publication
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publication à déliker
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publication délikée avec succès
 */
router.put('/:id/unlike', unlikePost);

/**
 * @swagger
 * /Blogify/posts/{id}/dislike:
 *   put:
 *     summary: Disliker une publication
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publication à disliker
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publication dislikée avec succès
 */
router.put('/:id/dislike', dislikePost);

/**
 * @swagger
 * /Blogify/posts/{id}/undislike:
 *   put:
 *     summary: Enlever un dislike d'une publication
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publication à enlever le dislike
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dislike retiré avec succès
 */
router.put('/:id/undislike', undislikePost);

/**
 * @swagger
 * /Blogify/posts/delete/{id}:
 *   delete:
 *     summary: Supprimer une publication par ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publication à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publication supprimée avec succès
 *       404:
 *         description: Publication non trouvée
 */
router.delete('/delete/:id', (req, res) => {
    deletePostById(req, res); 
});

export default router;
