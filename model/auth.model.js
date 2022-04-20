const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const DB_URL = "mongodb+srv://wasiim:wasiim@cluster0.3bgik.mongodb.net/shopDB?retryWrites=true&w=majority";

const UserSchema = mongoose.Schema({
    user_name : String,
    email : String,
    password : String,
    isAdmin : {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', UserSchema);

exports.CreateNewUser = (user_name, email, password) => {
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(()=>{
            return User.findOne({email:email})
        })
        .then((user) => {
            if (user) {
                reject('This Email Is Already Used !')
            } else {
                return bcrypt.hash(password,10)
            }
        }).then((hasedPassword) => {
            let user = new User({
                user_name : user_name,
                email : email,
                password: hasedPassword
            })
            return user.save()
        }).then(() => {
            resolve()
        }).catch((err) => {console.log(err)})
    })
};


exports.LogIn = (email, password) => {
    console.log(email , password , 'emaillllllll passssssssss')
    return new Promise ((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return User.findOne({email : email})
        })
        .then((user) => {
            console.log(user)
            if (!user) {
                reject('This Email Un Used')
            } else {
                console.log(password)
                bcrypt.compare(password, user.password)
                .then((same) => {
                    if (!same) {
                        reject('Password Incorrect')
                    } else {
                        resolve({
                            id : user._id,
                            isAdmin : user.isAdmin
                        })
                    }
                })
            }
        }).catch((err) => {
            reject(err)
        })
    })    
};