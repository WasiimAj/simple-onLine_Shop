const router = require('express').Router();
const adminProtect = require('./protect/admin.protect');
const adminControlaer = require('../controlaer/admin.controll');
const multer = require('multer');
const check = require('express-validator').check;

router.get('/admin/add', adminProtect, adminControlaer.getAdd)
router.get('/add_product', (req,res)=>{
    res.render('add_product',{
        isAdmin:true,
        isUser:true
    })
})

// router.post('/admin/add',adminProtect,multer({
//     storage:multer.diskStorage({
//         destination : (req,file,cb) => {
//             cb: (null, 'images')
//         },
//         filename : (req,file,cb)=>{
//             cb: (null, Date.now() +  '-' + file.originalname )
//         }
//     }),
//     dest:'images'
// }).single('image'),
// check('image').custom((value, {req})=> {
//     if (req.file) return true
//     else throw "Image Required !"
// })
// , adminControlaer.postAdd)

module.exports = router;