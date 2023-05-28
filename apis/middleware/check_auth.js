const jwt = require("jsonwebtoken")
module.exports = (req,res,next)=>{
    // const token = req.headers.authorization
    // console.log(token)
    try{
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const verify = jwt.verify(token,"this is dummy text")
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            msg : "invalid token"
        })
    }
}