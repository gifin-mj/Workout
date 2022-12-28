var passport = require('passport');
var controllers=require('../controllers/controllers')
var session =require('express-session')
var workoutmodel=require('../models/workoutmodel')




exports.index=(req,res,next)=>{

    let user=req.session.user
    if(req.session.userloggedIn){
      let user=req.session.user
      let userid=null
      user.id?userid=user.id:userid=user._id
      workoutmodel.find({userid:userid})
      .then((result)=>{
        console.log(result);
        res.render('index',{user,workout:result})
      })
    }
    else{
      workoutmodel.find()
      .then((result)=>{
        res.render('index',{workout:result})
      })
    }
}

exports.signup=(req,res,next)=>{
    res.render('signup')
}
exports.login=(req,res,next)=>{
    res.render('login')
}
exports.workout=(req,res,next)=>{
    let user=req.session.user;
    res.render('workout',{user})
}

exports.edit=(req,res,next)=>{
        id=req.params.id
        let user=req.session.user
        workoutmodel.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{
                console.log(data);
                res.render('workout',{user,workout:data})
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving book with id " + id+err})
        })
}