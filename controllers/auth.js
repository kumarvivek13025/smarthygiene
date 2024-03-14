const path=require('path');
const User=require('../models/user');
const bcrypt=require('bcrypt');
exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.redirect('/');
        }

        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/profile');
                })
            }
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}


exports.getProfile=(req,res,next)=>{
    res.render('user/profile',{
        path:'/profile'
    })
}

exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{
        path:'/login'
    });
}

exports.postSignUp=(req,res,next)=>{
    const userName=req.body.userName;
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email:email})
    .then(userDoc=>{
        if(userDoc){
            return res.redirect('/');
        }
        return bcrypt
        .hash(password,12)
        .then(encpassword=>{
            const user=new User({
                email:email,
                password:encpassword
            });

            return user.save();
        })
        .then(result=>{
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })

}