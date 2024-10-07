import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
        text: {type: String, required: true},
        author: {type: String, required: true},
        Post_ID: {type: String, required: true},
        Timestamp: {type: Date, default: null}
      
    });
const UsersModel=new mongoose.model("Commentaire", Userschema);
export default UsersModel;