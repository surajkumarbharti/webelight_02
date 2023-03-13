const userModel = require("../models/userModel.js");
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');


const createUser = async (req,res) =>{
    try{
        let data = req.body

        if(!data){
            return res.status(400).send({status:false,message:"plese enter your registeration details"})
        }

        const {name,email,password} = data

        if (!name){
            return res.status(400).send({status:false,message:"plese enter your name"})   
        }

        if (!email){
            return res.status(400).send({status:false,message:"plese enter your email"})   
        }

        if (!password){
            return res.status(400).send({status:false,message:"plese enter your password"})   
        }
        const salt = bcrypt.genSaltSync(10);

        const encryptedPassword = bcrypt.hashSync(password,salt);
    


    const user = {
        name,
        email,
        password: encryptedPassword
    }
    

    let UserData = await userModel.create(user)
    return res.status(201).send({status:true,msg:'registered successfully', data:UserData})
}

catch (err) {
    console.log(err)
    res.status(500).send({message:err.message})
  }
}

module.exports.createUser = createUser

const loginUser = async function (req,res){

    try{
        let requestBody = req.body;
        if(!requestBody){
            return res.status(400).send({status:false,msg:"plese enter login credentials"});
        }

        let {email,password } = requestBody;

        if(!email){
            res.status(400).send({status:false,msg:"enter email"});
        }

        if(!password){
            res.status(400).send({status:false,msg:"enter password"});

        }
        const user = await userModel.findOne({email:email});

        if (!user){
             return res.status(401).send({status:false,msg:" either email or password incorrect"});

        }
        const extractPassword = await userModel.findOne({email:email});
        let hash = extractPassword.password
        let pass = await bcrypt.compare(password,hash)
        if (!pass){
            return res.status(400).send({status:false,msg:"password Incorrect"})
        }
        var token = jwt.sign(
           {userId: user._id.toString()},
           "webelight",{
               expiresIn:'20days'
           }
        )
        res.setHeader("Authorization", token)
        res.status(200).send({status:true,msg:"successful login", data:{userId:user._id,token:token}});
    } catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}
module.exports.loginUser= loginUser