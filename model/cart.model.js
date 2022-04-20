const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://wasiim:wasiim@cluster0.3bgik.mongodb.net/shopDB?retryWrites=true&w=majority";

const cartSchema = mongoose.Schema({
    name :  String,
    price : Number,
    amount : Number,
    userID : String,
    productID : String,
    timeStamp : Number
})

const CartIteam = mongoose.model('cart', cartSchema);

exports.addNewIteam = (data) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            let iteam = new CartIteam (data)
            return iteam.save()
        })
        .then(() => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

exports.getIteamByUser = (userID) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return CartIteam.find({userID : userID}, {}, {timestamps:1})
        })
        .then((iteams) => {
            resolve(iteams)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

exports.deleteIteam = (id) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return CartIteam.findByIdAndDelete(id)
        })
        .then(() => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}