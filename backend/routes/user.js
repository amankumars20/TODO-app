const express = require("express");

const router = express.Router();
const zod = require("zod");

const {user,todo} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
const {authMiddleware} = require("../middlewares")


const signupbody = zod.object(
    {
        username:zod.string(),
        password: zod.string(),
        firstname:zod.string(),
        lastname: zod.string()
    }
)

router.post("/signup", async function(req,res)
{
    const {success}=signupbody.safeParse(req.body)
    if(!success){
        return res.status(411).json(
            {
                massage:"Incorrect Input"
            }
        )
    }

    const existingUser = await user.findOne(
        {
            username:req.body.username
        }
    )

    if(existingUser){
        return res.status(411).json(
            {
                massage:"Username already taken"
            }
        )
    }

    const User = await user.create(
        {
            username:req.body.username,
            password:req.body.password,
            firstname:req.body.firstname,
            lastname:req.body.lastName,
        }
    )
    const userId = User._id;
    console.log(userId)
    await todo.create({
        userId,
        title:"",
        description:""
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token,
        user_id:userId
    })
})

const signinbody = zod.object(
    {
        username:zod.string().email(),
        password:zod.string()
    }
)

router.post("/signin", async function(req,res)
{
    const {success} = signinbody.safeParse(req.body);
    if(!success){
        return res.status(411).json(
            {
                massage:"Email already taken/Incorrect input"
            }
        )
    }

    const User = await user.findOne(
        {
            username:req.body.username,
            password:req.body.password
        }
    );

    if(User){
        const token = jwt.sign({
            userId: User._id
        }, JWT_SECRET);
    console.log(User._id)
        res.json({
            token: token,
            user_id:User._id
        })
        return;
    }
    res.status(411).json({
        massage:"Error while logging in"
    })
})



const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await user.updateOne(req.body, {
        id: req.UserId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get('/data', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Use userId to query the database and retrieve the specific user's data
      const userData = await user.findById(userId); // Example: Using Mongoose to query MongoDB
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/getfname',authMiddleware, async (req, res) => {
    console.log("aman")
    try {
        const User = await user.findOne({ userid: req.user_id });
      if (User) {
        // Send the first name as part of a JSON object
        res.status(200).json({ firstname: User.firstname });
        console.log(User.firstname);
      } else {
        // Send an error message if the user is not found
        res.status(401).json({ error: "User not registered" });
        console.log("User is not registered");
      }
    } catch (err) {
      // Handle any errors that occur during processing
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
module.exports = router;