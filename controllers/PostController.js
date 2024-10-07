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
            likes: 0, // Initialiser à 0 lors de la création
        });

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

// Fonction pour liker un post
export async function likePost(req, res) {
    const userId = req.user.id;

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Si l'utilisateur a déjà disliké, on retire son dislike
        if (post.dislikedBy.includes(userId)) {
            post.dislikedBy.pull(userId);
            post.dislikes = post.dislikedBy.length; // Met à jour le nombre de dislikes
        }

        // Si l'utilisateur a déjà liké, on retire son like
        if (post.likedBy.includes(userId)) {
            post.likedBy.pull(userId);
        } else {
            post.likedBy.push(userId);
        }

        // Met à jour le nombre de likes
        post.likes = post.likedBy.length;

        // Sauvegarde du post
        await post.save();

        // Retourne uniquement le post mis à jour
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send("Failed to like the post", error);
    }
}

// Fonction pour déliker un post
export async function unlikePost(req, res) {
    const userId = req.user.id;

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Vérifie si l'utilisateur a aimé le post
        if (!post.likedBy.includes(userId)) {
            return res.status(400).json({ message: "User has not liked this post" });
        }

        // Enlève l'utilisateur de la liste des utilisateurs qui aiment
        post.likedBy.pull(userId);
        post.likes = post.likedBy.length; // Met à jour le nombre de likes en fonction du tableau

        await post.save(); // Sauvegarde les modifications

        res.status(200).json(post); // Retourne le post mis à jour
    } catch (error) {
        res.status(500).json({ message: "Failed to unlike the post", error });
    }
}

// Fonction pour disliker un post
export async function dislikePost(req, res) {
    const userId = req.user.id;

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Si l'utilisateur a déjà liké, on retire son like
        if (post.likedBy.includes(userId)) {
            post.likedBy.pull(userId);
            post.likes = post.likedBy.length; // Met à jour le nombre de likes
        }

        // Si l'utilisateur a déjà disliké, on retire son dislike
        if (post.dislikedBy.includes(userId)) {
            post.dislikedBy.pull(userId);
        } else {
            post.dislikedBy.push(userId);
        }

        // Met à jour le nombre de dislikes
        post.dislikes = post.dislikedBy.length;

        // Sauvegarde du post
        await post.save();

        // Retourne uniquement le post mis à jour
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send("Failed to dislike the post", error);
    }
}

// Fonction pour enlever un dislike d'un post
export async function undislikePost(req, res) {
    const userId = req.user.id; 

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Vérifie si l'utilisateur a disliké le post
        if (!post.dislikedBy.includes(userId)) {
            return res.status(400).json({ message: "User has not disliked this post" });
        }

        // Enlève l'utilisateur de la liste des utilisateurs qui n'aiment pas
        post.dislikedBy.pull(userId);
        post.dislikes = post.dislikedBy.length; // Met à jour le nombre de dislikes en fonction du tableau

        await post.save(); // Sauvegarde les modifications

        res.status(200).json(post); // Retourne le post mis à jour
    } catch (error) {
        res.status(500).json({ message: "Failed to undislike the post", error });
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