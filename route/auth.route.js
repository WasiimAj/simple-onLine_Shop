const router = require('express').Router();
const check = require('express-validator').check;

const authControlaer = require('../controlaer/auth.controll');
const authProtect = require('./protect/auth.protect');

router.get('/signup', authProtect.notAuth,  authControlaer.getSignUp);

router.post('/signup',
    check('user_name').not().isEmpty().withMessage('Enter User Name .!'),
    check('email').not().isEmpty().withMessage('Enter Email .!').isEmail().withMessage('Enter Valid Email .!'),
    check('password').isLength({min:6}).withMessage('password must be 6 less than caracters .!'),
    check('confairmPassword').custom((value, {req})=>{
        if (value === req.body.confairmPassword) return true
        else throw "password not matches"
    }).withMessage('password not matches'),
    authControlaer.postSignUp
);

router.get('/login', authProtect.notAuth,  authControlaer.getLogIn);

router.post('/login',
    check('email').not().isEmpty().isEmail().withMessage('Enter Email'),
    check('password').isLength({min:6}).withMessage('password must be 6 less than caracters .!'),
    authControlaer.PostLogIn
);

router.all('/logout', authProtect.isAuth, authControlaer.logout);

module.exports = router;


