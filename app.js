// [ 1 ] - Server SetUp

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// [ 2 ] - EJS SetUp

const ejs = require('ejs');
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

// Body-Parser SetUp

const bodyBarser = require('body-parser');
app.use(bodyBarser.urlencoded({extended:true}))

// Session SetUp 

const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);

const Store = new SessionStore({
    uri: "mongodb+srv://wasiim:wasiim@cluster0.3bgik.mongodb.net/shopDB?retryWrites=true&w=majority",
    collection: "sessions"
})

app.use(session({
    secret: "WA@1dtyicj591$523wqqerrxvvbngzaa@13#@ww",
    saveUninitialized: true,
    resave:true,
    store: Store
}))

// Flash SetUp

const flash = require('connect-flash');
app.use(flash());



// All Router 

const homeRouter = require('./route/home.route.js');
const productRouter = require('./route/product.route');
const authRouter = require('./route/auth.route');
const cartRouter = require('./route/cart.route');
const adminRouter = require('./route/admin.route');

// All App Use

app.use(homeRouter);
app.use('/product',productRouter);
app.use(authRouter);
app.use(cartRouter);
app.use(adminRouter);

// [ 3 ] - GET Requests

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('cart')
})

app.get('/login',(req,res) => {
    res.render('login')
})

app.get('/signup',(req,res) => {
    res.render('signup')
})

app.get('/add_product',(req,res) => {
    res.render('add_product',{
        isUser : req.session.userId
    })
})

app.use((req,res)=>{
    res.status(404)
    res.render('error404', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle:'page not found'
    })
})

app.listen(port,()=>{
    console.log(`Server Runuing ...`)
})

