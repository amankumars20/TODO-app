const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin_20:aks97420@cluster0.bclswht.mongodb.net/Todo_APP");

const userschema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
        },
        password:{
            type:String,
            required: true,
        },
        firstname:{
            type:String,
            required: true,
        },
        lastname:{
            type:String,
        }

    }
);
const todoschema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
            required: true
        },
        title:{
            type:String,
        },
        description:{
            type:String,
        }
    }
);

const user = mongoose.model("user",userschema);

const todo = mongoose.model("todo",todoschema);
module.exports={
    user,
    todo
};

