const router = require('express').Router()
const productControlaer = require('../controlaer/product.controlaer')


router.get('/:id', productControlaer.getProduct)

router.get('/',(req,res)=>{
    res.render('product',{
        validationErrors: 'validationErrors'
    })
})

router.post('/', 
    productControlaer.postProduct
)


module.exports = router;

