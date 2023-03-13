const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")


const userAuth = async(req,res,next) => {
    try {
        const token = req.header('Authorization','Bearer Token')

        if(!token){
            return res.status(403).send({status:false,message:'Token must be present'});
        }
        let validToken = token.split(' ')
        console.log("validToken length - ",validToken.length)
        console.log("validToken [0] - ",!validToken[0])

        console.log("validToken [1] - ",validToken[1])


        if(validToken.length !== 2 || validToken[0] !== "Bearer" || !validToken[1]){
            return res.status(403).send({status:false,msg:'plese provide token'})

        }
        const decodeToken = jwt.verify(validToken[1], "webelight", { ignoreExpiration: true })    //If present then verify the secret key

        if (!decodeToken) {
            return res.status(403).send({ status: false, message: 'You are not autherised to access.' });
        }

        let expiration = decodeToken.exp

        let tokenExtend = Math.floor(Date.now() / 1000)

        if (expiration < tokenExtend) {
            return res.status(401).send({ status: false, message: "Token is expired" })
        }

        req.userId = decodeToken.userId

        next();     //if token is present & for the same user then move to the next
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports.userAuth = userAuth;


const Authorisation = async function (req, res, next) {
    try {
        let token = req.headers['authorization']
        if (!token) token = req.headers['Authorization']
        if (!token) {
            return res.status(400).send({ status: false, message: "Please enter bearer token" })
        }
        let userId = req.params.userId;

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "UserId is not valid" })
        }

        let validToken = token.split(' ')


        if (validToken.length !== 2 || validToken[0] !== "Bearer" || !validToken[1]) {
            return res.status(403).send({ status: false, message: 'Please provide token' })
        }

        const decodeToken = jwt.verify(validToken[1], "webelight")

        let decoded = decodeToken.userId

        let User = await userModel.findById(userId)
        console.log(User)
        if (!User) {
            return res.status(404).send({ status: false, message: "User does not exist" })
        }


        // checking if the userId in token is the same as id provided in params 
        let user = User._id.toString()

        if (user != decoded) {
            return res.status(401).send({ status: false, message: "Not Authorised!!" })
        }
        next()

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

module.exports.Authorisation = Authorisation
    
