const authModel = require('../model/auth.model');
const validationResualt = require('express-validator').validationResult;

exports.getSignUp = (req, res) => {
    res.render('signup', {
        AuthError: req.flash('AuthError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser : req.session.userId,
        isAdmin:false
    })
};

exports.postSignUp = (req, res) => {
    if ( validationResualt(req).isEmpty() ) {
        authModel.CreateNewUser(req.body.user_name, req.body.email, req.body.password)
        .then(() => { 
            res.redirect('/login')
        })
        .catch((err) => {
            req.flash('AuthError', err)
            res.redirect('/signup')
        })
    } else {
        req.flash('validationErrors', validationResualt(req).array())
        res.redirect('/signup')
    }
};

exports.getLogIn = (req, res) => {
        res.render('login', {
        AuthError: req.flash('AuthError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser : req.session.userId,
        isAdmin:false

    })
};

exports.PostLogIn = (req, res) => {
    if ( validationResualt(req).isEmpty() ) {
        authModel
        .LogIn(req.body.email, req.body.password)
        .then((result)=>{
            req.session.userId = result.id
            req.session.isAdmin = result.isAdmin
            res.redirect('/')
        })
        .catch((err) => {
            req.flash('AuthError', err)
            res.redirect('/login')
        })
    } else {
        req.flash('validationErrors', validationResualt(req).array())
        res.redirect('/login')
    }
}; 

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
};