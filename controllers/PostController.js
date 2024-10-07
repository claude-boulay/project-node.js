import fs from 'fs';
import mongoose from 'mongoose';
import Post from "../models/postModel.js";

// Fonction pour crée un post
export async function AddPost(title, content, author, tags) {
    try {
        const post = new Post({
            title,
            content,
            author,
            tags,
        });

        // Sauvegarde du post dans MongoDB
        const savedPost = await post.save(); // Attendre ici

        return savedPost; // Retourne le post sauvegardé
    } catch (error) {
        console.error("Error adding post:", error);
        throw new Error("Failed to add post");
    }
}

// Fonction pour lire tous les posts
export  async function getAllPosts(req, res) {
    try {
        const posts =  await Post.find(); 
        res.status(200).json(posts); 
    } catch (error) {
        res.status(500).send("Failed to read posts", error );
    }
}

// Fonction pour lire un post via son id
export async  function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id); // Récupère le post par ID
        if (!post) {
            return res.status(404).sen("Post non trouvé" );
        }
        res.status(200).json(post); 
    } catch (error) {
        res.status(500).send("Failed to read the post", error );
    }
}

// Fonction pour mettre à jour un post
export async function updatePostById(req, res) {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
                "timestamps.updated_at": new Date()
            },
            { new: true }
        );

        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send("Failed to update the post", error );
    }
}

// Fonction pour supprimer un post via son id
export async function deletePostById(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id); // Supprime définitivement le post

        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.status(200).send("Post deleted" );
    } catch (error) {
        res.status(500).json("Failed to delete the post", error );
    }
}