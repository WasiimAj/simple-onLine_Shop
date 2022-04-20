const productModel = require('../model/product.model');


exports.getAdd = (req,res) => {
    res.render('add_product', {
        isUser: true,
        isAdmin: true,
        validationErrors: req.flash('validationErrors')
    })
}

