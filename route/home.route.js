const router = require('express').Router()
const HomeControlaer = require('../controlaer/home.controll.js')
const authProtect = require('./protect/auth.protect')

router.get('/',HomeControlaer.getHome)

module.exports = router;