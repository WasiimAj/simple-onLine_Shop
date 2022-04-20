const router = require('express').Router();
const cartControlaer = require('../controlaer/cart.controll');
const authProtect = require('./protect/auth.protect')

const check = require('express-validator').check;

router.get('/cart', authProtect.isAuth, cartControlaer.getCart);

router.post('/cart', authProtect.isAuth,
    check('amount').not().isEmpty()
    .withMessage('Amount Required !').isInt({min:1})
    .withMessage('amount must Be grather than 0')
    ,cartControlaer.postCart 
)

router.post('/cart/delete', authProtect.isAuth, cartControlaer.postDelete)

module.exports = router;