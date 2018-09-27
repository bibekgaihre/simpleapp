const Sequelize=require('sequelize');

const connection=new Sequelize('app','root','',{
    host:'127.0.0.1',
    dialect:'mysql',
    operatorsAliases:false
});

var user=connection.define('user',{
    userid:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    fullname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        
    },
    password:{
        type:Sequelize.BLOB,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

connection.sync();

exports=module.exports={
    user
}