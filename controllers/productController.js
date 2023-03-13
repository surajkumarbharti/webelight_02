const productModel = require('../models/productModel');


const createProduct = async function (req,res){
    try{
        let data = req.body

        if (!data) {
            return res.status(400).send({ status: false, message: "Please enter your details to Create Product" })   //validating the parameters of body
        }
        let {title,description,price,category}=data

        if (!title) {
            return res.status(400).send({ status: false, message: "Please provide select title" })
        }
        if (!category) {
            return res.status(400).send({ status: false, message: "Please provide select category" })
        }

        if (!description) {
            return res.status(400).send({ status: false, message: "Please provide select description" })
        }

        if (!price) {
            return res.status(400).send({ status: false, message: "Please provide select price" })
        }
        if (!(!isNaN(Number(price)))) {
            return res.status(400).send({ status: false, msg: " price should be valid number" })
        }
        const product = {title,description,price,category}
        let productData = await productModel.create(product)
        return res.status(201).send({status:true,msg:'product created',data:productData})

    }
    catch (err){
        console.log(err)
        res.status(500).send({message:err.message})
    }
}

module.exports.createProduct = createProduct


const updateproduct = async function (req,res){
    try{
        let data = req.body
        let productId = req.params.productId
        let {title,description,price} = data

        if (!(productId)) {
            return res.status(400).send({ status: false, message: "Please provide valid productID" })
        }
        let productsId = await productModel.findById(productId) 
        if(!productId){
            return res.status(400).send({status:false,message:'No product found'})
        }
        if (!(data)) {
            return res.status(400).send({ status: false, msg: "Please enter data to update" });
        }
        if (title == "") {
            return res.status(400).send({ status: false, message: "Please provide title" })

        }
        if (description == "") {
            return res.status(400).send({ status: false, message: "Please provide description" })

        }
        if (price == "") {
            return res.status(400).send({ status: false, message: "Please provide price" })

        }
        const updateData = await productModel.findOneAndUpdate({_id:productsId,isDeleted:false},
            {title:title,description:description,price:price},{new:true})
            res.send({Data:updateData}),{msg:'product updated'}
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:err.message})
    }
}

module.exports.updateproduct = updateproduct

const getproducts = async function (req,res){
    try{
        let filter = req.query
        let category = filter.category
        let title = filter.title
        let price = filter.price

        let getresult = {}

        if (!(filter)){
            let allproducts = await productModel.find({filter,isDeleted:false})
            return res.status(200).send({msg:'all products', data:allproducts})
        }
            if(category){
                getresult['category']= category
            }
            if(title){
                getresult['title']= title
            }
            if(price){
                getresult['price']= price
            }
            // console.log(getresult)
            const findresult = await productModel.find(getresult)
            if(findresult.length == 0){
                 return res.status(404).send({msg:" product not found"}) 
            }
            return res.status(200).send({msg:"All product", data:findresult}) 
       
    }
    catch(err){
        console.log(err)
        res.status(500).send({msg:err.msg})
    }
}
module.exports.getproducts = getproducts


const deleteProductById = async function (req,res){

    try{
        const productId = req.params.productId   

        if(!productId){
            return res.status(400).send({status:false,msg:'Invalid product in params'})
        }
        const product = await productModel.findOne({_id:productId,isDeleted:false})

        if(!product){
            return res.status(404).send({status:false,msg:`product not found`})
        }
        await productModel.findOneAndUpdate({_id:productId},{$set:{isDeleted:true,deletedAt: new Date()}})
        return res.status(200).send({status:true,msg:'successfully deleted'})
     }
    catch(err){
        return res.status(500).send({status:false,msg:error.message});

    }
}

module.exports.deleteProductById = deleteProductById
