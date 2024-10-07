import express from 'express';
import fs from 'fs';
import { getUser, updateUser, deleteUser, createUser, Connected } from '../controllers/UserController.js';
import jwt from 'jsonwebtoken';
import { urlencoded } from 'express';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /Blogify/users/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/register', (req, res) => {
    let parsedBody = req.body;
    createUser(parsedBody.username, parsedBody.email, parsedBody.password);
    res.status(201).send("User created successfully");
});

/**
 * @swagger
 * /Blogify/users/login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie, retourne un token
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', (req, res) => {
    let body = req.body;
    Connected(body.email, body.password).then((user) => {
        if (user) {
            const secret = fs.readFileSync(".env", "utf8");
            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
            res.status(200).send(token);
        } else {
            res.status(401).send({ error: "Invalid credentials" });
        }
    }).catch((err) => {
        res.status(401).send({ error: "Invalid credentials", "admin": err.message });
    });
});

router.use(authMiddleware);

/**
 * @swagger
 * /Blogify/users/{id}:
 *   get:
 *     summary: Obtenir les détails d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur retournés
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', (req, res) => {
    getUser(req.params.id).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(404).send({ error: "User not found" });
    });
});

/**
 * @swagger
 * /Blogify/users/{id}:
 *   put:
 *     summary: Mettre à jour les informations d'un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Informations de l'utilisateur mises à jour avec succès
 *       400:
 *         description: Données invalides
 */
router.put('/:id', (req, res) => {
    updateUser(req.params.id, req.body.username, req.body.email, req.body.password).then(() => {
        res.status(201).send("User updated successfully");
    }).catch((err) => {
        res.status(400).send({ error: "Invalid data " });
    });
});

/**
 * @swagger
 * /Blogify/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', (req, res) => {
    deleteUser(req.params.id).then(() => {
        res.status(200).send("User deleted successfully");
    }).catch((err) => {
        res.status(404).send({ error: "User not found", message: err.message });
    });
});

export default router;
