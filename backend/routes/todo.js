const express = require("express");

const router = express.Router();

const {user,todo} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
const {authMiddleware} = require("../middlewares");
const { use } = require("./user");

const todobody = zod.object(
    {
        title:zod.string(),
        description:zod.string()
    }
)

router.post("/add_todo",authMiddleware,async function(req,res)
{
    const {success} = todobody.safeParse(req.body);
    if(!success){
        return res.status(411).json(
            {
                massage:"something went wrong"
            }
        )
    }
    const todo_id = await todo.findOne({
        userId: req.userId
    });
    const Todo = await todo.create(
        {
            todo_id,
            title:req.body.title,
            description:req.body.description
           
        }
    )

    console.log("todo")

    const TODOId = todo._id;
    res.json({
        message: "todo created successfully",
    })


})
router.get("/display", authMiddleware, async function(req, res) {
    try {
        // Find todos belonging to the authenticated user
        const todos = await todo.find({ userId: req.userId });
        console.log("this is the id "+req.userId)
        // If there are no todos found for the user, respond with an appropriate message
        if (todos.length === 0) {
            return res.status(404).json({
                message: "No todos found for the user"
            });
        }

        // Respond with todos found for the user
        res.json(todos);
        console.log(todos)
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// username: "amankumarsahu@gmail.com",
// password:"0909009090909"
router.delete("delete_todo",function (req,res){
    
})
module.exports = router;
