import express from 'express';
import { createComments, deleteComment, updateComment, getCommentsByPostID } from '../controllers/CommentaireControllers.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gestion des commentaires
 */

/**
 * @swagger
 * /Blogify/posts/{id}/comments:
 *   post:
 *     summary: Créer un nouveau commentaire pour un post
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du post auquel le commentaire est associé
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               Author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/:id/comments', (req, res) => {
    createComments(req.body.text, req.body.Author, req.params.id)
        .then(comment => res.status(201).send("Comment created successfully"))
        .catch(err => res.status(400).send({ error: "Invalid data" }));
});

/**
 * @swagger
 * /Blogify/comments/{id}:
 *   put:
 *     summary: Mettre à jour un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du commentaire à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire mis à jour avec succès
 *       400:
 *         description: Données invalides
 */
router.put('/comments/:id', (req, res) => {
    updateComment(req.params.id, req.body.text)
        .then(comment => res.status(201).send("Comment updated successfully"))
        .catch(err => res.status(400).send({ error: "Invalid data" }));
});

/**
 * @swagger
 * /Blogify/comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du commentaire à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.delete('/comments/:id', (req, res) => {
    deleteComment(req.params.id)
        .then(comment => res.status(201).send("Comment deleted successfully"))
        .catch(err => res.status(404).send({ error: "Comment not found" }));
});

/**
 * @swagger
 * /Blogify/posts/{id}/comments:
 *   get:
 *     summary: Obtenir tous les commentaires d'un post
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du post dont on souhaite récupérer les commentaires
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des commentaires retournés
 *       404:
 *         description: Post non trouvé
 */
router.get('/posts/:id/comments', (req, res) => {
    getCommentsByPostID(req.params.id)
        .then(comments => res.send(comments))
        .catch(err => res.status(404).send({ error: "Post not found" }));
});

export default router;
