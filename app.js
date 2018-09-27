const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const session=require('express-session');
const expressValidator=require('express-validator');
const cookieParser=require('cookie-parser');

const app=express();
const path=require('path');

const index=require('./routes/index');


app.use(express.static('public'));
app.set('views',path.join(__dirname,'app/views'));

app.set('view engine','ejs');

app.use(cookieParser());
app.use(session({
    secret:'iloveit',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:365*24*60*60*1000}
}))


app.use(function(req,res,next){
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use('/',index);

module.exports=app;