const express = require("express")
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require("../models/Users")
const bcrypt = require("bcryptjs")
const JWT_SECRET = "lakshyaisgoodboy"
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")


// Route1: create user using : POST
router.post('/createuser',[
    check("email","Enter correct email address").isEmail(),
    check("name","Min length name is 5").isLength({min:5}),
    check('password',"Minimum lenght password is 8").isLength({min:8})
],async (req,res)=>{
    const errors = validationResult(req.body);
    // console.log(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    else{
        try {
            let user = await User.findOne({email:req.body.email}); 
            //checking email exists or not  
            if(user){
                return res.status(400).json({error:"Sorry a user with this email is already exists"})
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password,salt);

                let newUser = {
                    name:req.body.name,
                    password: secPass,
                    email:req.body.email
                }
                user = await User.create(newUser)

            }
            //jwt token send kar rahe hai hum
            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data,JWT_SECRET);
            console.log(authToken)
            res.json({authToken})
            // res.send("New user is created")
        } catch (error) {
            console.log(error)
            //if there is any error in the db then we are sending status 500
            res.status(500).send("Internal Server Error Try after some time");
        }
        
        
    }
})

// Route 2: Authenticate the user which is going to login the website
router.post('/login',[
    check("email","Enter correct email address").isEmail(),
    check('password',"Password connot be blank").exists()
],async (req,res)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    else{
        const {email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error:"Please try to login with correct Credentials"});
            }

            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({error:"Please try to login with correct Credentials"});
            }

            const data = {
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data,JWT_SECRET);
            res.json({authToken});
        } catch (error) {
            console.log(error)
            //if there is any error in the db then we are sending status 500
            res.status(500).send("Internal Server Error Try after some time");
        }
    }
})

// Route 3: Get loggedin user details using post "api/auth/getuser"

router.post('/getuser',fetchuser, async(req,res)=>{
    try {
        const userId = req.user.id;
        console.log(userId)
        const user = await User.findById(userId).select("-password");
        console.log(user)
        res.send(user);
    } catch (error) {
        console.log(error)
        //if there is any error in the db then we are sending status 500
        res.status(500).send("Internal Server Error Try after some time");
    }
})
module.exports = router