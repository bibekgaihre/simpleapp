const user=require('../../config/databaseconnection').user;
const bcrypt=require('bcrypt');
exports.insertuser=function(fullname,username,email,hash,phone,callback1,callback2){
    user.create({
        fullname:fullname,
        username:username,
        email:email,
        password:hash,
        phone:phone
    }).then((user)=>{
        console.log('Success!!');
        callback1();
    }).catch((err)=>{
        if(err) throw err;
        callback2();
    })
}

exports.loginuser=function(username,password,callback1,callback2,callback3){
    user.findOne({where:{username:username}})
    .then(function(users){
        if(!users){
            console.log('USername does not exist ');
            callback1();
        }
        if(users){
            var hash=users.password.toString();
            bcrypt.compare(password,hash,function(err,response){
                if(response===true){
                    callback2();
                }
                else{
                    callback3();
                }
            })
        }
    }).catch((err)=>{if(err) throw err;});
}