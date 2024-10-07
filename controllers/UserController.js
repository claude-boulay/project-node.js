import UsersModel from "../models/UserModel.js";
import fs from "fs";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export function createUser(username,email, password) {
    const hash=bcrypt.hashSync(password, 10);
    const User=Object(username,hash,email);
    UsersModel.create(User);
    return true;

}

export async function Connected(email, password){
    return new Promise((resolve, reject) => {
        UsersModel.findOne({email:email}, (err, user) => {
            if(err) reject(err);
            if(!user) reject("User not found");
            bcrypt.compare(password, user.hash, (err, res) => {
                if(err) reject(err);
                resolve(res);
            });
        });
    });
}
export async function  getUser(id){
   const User= await UsersModel.findById(id);
   return User;
}

export async function deleteUser(id){
    await UsersModel.findByIdAndDelete(id);
}

export async function updateUser(id, username, email, password){
    hash=bcrypt.hashSync(password, 10);
    await UsersModel.findByIdAndUpdate(id, {username, email, hash});
}

