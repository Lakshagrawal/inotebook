const JWT_SECRET = "lakshyaisgoodboy"
const jwt = require("jsonwebtoken");
const { stringify } = require("querystring");

const fetchuser = async(req,res,next)=>{
    //get the user from the jwt toke and add id to req object
    let token = await req.headers['authtoken'];
    // console.log(token)
    if(!token || token === undefined){
        res.status(401).send({error:"please authenticate using a valid token 1"});
    }
    else{
        try {
            const data = await jwt.verify(token, JWT_SECRET);
            // console.log("this is the data: ",data)
            req.user = data.user;
            next();
        } catch (error) {
            console.log(error)
            return res.status(401).send({ error: "Please authenticate using a valid token" });
        }
    }
    
}

module.exports = fetchuser;