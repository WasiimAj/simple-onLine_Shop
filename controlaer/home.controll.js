const productModel = require('../model/product.model')


exports.getHome = (req ,res) => { 
    
    const category = req.query.category;

    if ( category && category !== 'all') {
        productModel.getProductesByCategory(category)
        
        .then((productes)=>{
        
            res.render('home', {
                isUser : req.session.userId,
                isAdmin:req.session.isAdmin,
                productes: productes,
                validationErrors : req.flash('validationErrors')
            })
        })
    } else {
        console.log(req.session.userId)
        productModel.getAllProudctes(category)
        

        .then((productes)=>{
            res.render('home',{
                validationErrors : req.flash('validationErrors')[0],
                isUser : req.session.userId,
                isAdmin : req.session.isAdmin,
                productes:productes
            })
        })
    }
}
