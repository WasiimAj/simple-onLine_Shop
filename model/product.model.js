const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://wasiim:wasiim@cluster0.3bgik.mongodb.net/shopDB?retryWrites=true&w=majority";

const proudctSchema = mongoose.Schema({
    name  : String,
    image : String,
    price : Number,
    discription : String,
    category: String
})

const product = mongoose.model('product',proudctSchema)

exports.getAllProudctes = () => {
    return new Promise ((resolve, reject) => {
        
        // [1] Conected With DataBase

        mongoose.connect(DB_URL).then(()=>{
        
        // [2] Get Productes Form DataBase
        
            return product.find({})
            .then((productes)=>{
                resolve(productes)
            })
            .catch((err)=>{reject(err)})
        })
    })
}


exports.getProductesByCategory = (category) => {
    return new Promise ((resolve,reject) => {
        mongoose.connect(DB_URL)
        .then(()=>{
            return product.find({category:category})
        })
        .then((productes)=>{
            resolve(productes)
        })
        .catch((err) => {reject(err)})
    })
}

exports.getproductByID = (id) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(()=>{
            return product.findById(id)
        })
        .then(() => {
            
            resolve()
        })
        .catch((err) => {reject(err)})
    })
}

exports.AddNewProduct = (name,price,discription,category,image) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let PRODUCT = new product({
                name: name,
                price:price,
                discription:discription,
                category:category,
                image:image
            })
            return PRODUCT.save()
        })
        .then(()=>{
            resolve()
        })
        .catch((err)=>{
            reject(err)
        })
    })
}