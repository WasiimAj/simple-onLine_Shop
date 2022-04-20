const productModel = require('../model/product.model')

exports.getProduct = (req, res) => {
    
    let id = req.params.id
    productModel.getproductByID(id)
    .then((productes)=>{
        res.render('product', {
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            productes:productes
        })
    })
}

exports.postProduct = (req,res) => {
    productModel.AddNewProduct(
        req.body.name,
        req.body.price,
        req.body.discription,
        req.body.category,
        req.body.image
        )
    .then(()=>{
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/add_product')
    })
}