const { default: mongoose } = require('mongoose');
const cartModel = require('../model/cart.model');
const validationResult = require('express-validator').validationResult;

exports.getCart = (req,res) => {
    cartModel.getIteamByUser(req.session.userId)
    .then((iteams) => {
        res.render('cart', {
            iteams: iteams,
            isUser:true,
            isAdmin: req.session.isAdmin
        })
    })
    .catch(err => {console.log(err)})
}


exports.postCart = (req,res) => {
    if (validationResult(req).isEmpty()) {
        cartModel.addNewIteam({
            name : req.body.name,
            price : req.body.price,
            amount : req.body.amount,
            productID : req.body.productID,
            userID : req.session.userId,
            timeStamp : Date.now()
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch((err)=>{
            console.log(err)
        })
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.postDelete = (req, res) => {
    return cartModel.deleteIteam(req.body.cardID)
    .then(()=>{
        res.redirect('/cart')
    })
    .catch((err) => {
        console.log(err)
    })
}

