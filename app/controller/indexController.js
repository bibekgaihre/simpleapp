const indexModel=require('../model/indexModel');

const bcrypt=require('bcrypt');
const saltRounds=10;

const user=require('../../config/databaseconnection').user;

exports.index=function(req,res,next){
    if(req.session.username){
        res.redirect('/dashboard');
    }
    else{
        res.render('index.ejs',{
            notification:'',
            notificationlogin:''
        });
    }
    
}

exports.register=function(req,res,next){
    req.checkBody('email','The email you entered is invalid').isEmail();
    const errors=req.validationErrors();
    if(errors){
        res.render('index.ejs',{
            notificationlogin:'',
            notification:'Registration Failed. Please check and try again'
        })
    }
    else{
        var fullname=req.body.fullname;
        var username=req.body.username;
        var email=req.body.email;
        var password=req.body.password;
        var phone=req.body.phone;
        bcrypt.hash(password,saltRounds,function(err,hash){
            indexModel.insertuser(fullname,username,email,hash,phone,function(err,result){
                if(err) throw err;
                else{
                    res.render('index.ejs',{
                        notification:'Registration Sucessfull',
                        notificationlogin:''
                    })
                }
            },function(err,result){
                res.render('index.ejs',{
                    notification:'Registration Failed',
                    notificationlogin:''
                })
            })
        })
    }
   
}

exports.login=function(req,res,next){
    var username=req.session.username=req.body.username;
    var password=req.session.password=req.body.password;
    indexModel.loginuser(username,password,function(err,result){
        res.render('index.ejs',{
            notification:'',
            notificationlogin:'Username not found'
        })
    },function(err,result){
        res.redirect('/dashboard');
    },function(err,result){
        res.render('index.ejs',{
            notification:'',
            notificationlogin:'Incorrect Password'
        })
    })
}

exports.logout=function(req,res,next){
    req.session.destroy(function(err){
        res.clearCookie();
        if(err){
            res.negotiate(err);
        }
        res.redirect('/');
    })
};

exports.dashboard=function(req,res,next){
    var sessionuser=req.session.username;
    if(req.session.username){
        user.findOne({where:{username:sessionuser}})
        .then(function(users){
            res.render('dashboard.ejs',{
                username:sessionuser
            })
        })
    }
    else{
        res.redirect('/');
        res.end();
    }
}