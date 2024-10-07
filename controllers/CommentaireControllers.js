
import CommentaireModel from "../models/CommentaireModel.js";

export async function createComments(content, author_ID,Post_ID){
    const NewCommentaire={text:content, author:author_ID, Post_ID,Timestamp:new Date()};
    CommentaireModel.create(NewCommentaire).then(()=>{return true}).catch((err)=>console.log(err)); 
}

//obtention des commentaire pour un post donné
export async function getCommentsByPostID(post_ID){
    const comments= await CommentaireModel.find({Post_ID});
    return comments;
}

export async function deleteComment(comment_ID){
    await CommentaireModel.findByIdAndDelete(comment_ID);
}

export async function updateComment(comment_ID, content){
    await CommentaireModel.findByIdAndUpdate(comment_ID, {text:content});
}