const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    { 
        author: {
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
    content: String, 
    comments: [{
        type: Schema.Types.ObjectId,
        ref:"Comment" 
    }]
},
{
    timestamps: true
});

const Post = model("Post", postSchema);
module.exports = Post;