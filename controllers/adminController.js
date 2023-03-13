const userModel = require("../models/userModel.js");
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');





const getallUser = async function (req, res) {
    try {
        const adminId = req.body
        let id = adminId.adminId
       //console.log("adminId  ",id)

        if (!(adminId)) return res.status(400).send({ status: false, message: "Please Provide valid adminId" })
        const isAdmin = await userModel.find({$and:[{_id: id},{admin:true}]})
        //console.log("    isAdmin"      ,    isAdmin)
        if(isAdmin.length == 0){
            return res.status(400).send({status :false, msg:"admin not found"})
        }

        const alluserDetails = await userModel.find()
        
    

        if (!alluserDetails) return res.status(404).send({ status: false, message: "No such user Exists" })

        return res.status(200).send({ status: true, message: "User profile details", admin:true, data: alluserDetails })
    } catch (error) {
        return res.status(500).send({ status: false, Error: error.message })
    }
}

module.exports.getallUser = getallUser