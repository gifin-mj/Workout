//importing models

const usermodel=require('../models/usermodel')
const workoutmodel=require('../models/workoutmodel')


//signup
exports.signup=(req,res,next)=>{
    console.log(req.body);
    if(req.body.password === req.body.cpassword){ //checking password and confirm password
        const user=new usermodel({
            name:req.body.name,
            password:req.body.password
        })
        user
                .save()
                .then((result)=>{
                    let lastid=JSON.stringify(result._id)
                    console.log(lastid);
                    let image=req.files.image
                        lastid=lastid.split('"').join('')
                     image.mv('./public/images/'+lastid+'.jpg',(err,done)=>{
                if(err)
                 console.log(err);
                else
                res.redirect('/')
            })
                })
                .catch((err)=>{
                    res.status(500).send({
                        message : err.message || "Some error occurred while creating a create operation"
                    });
                })
    }
    else{
        res.render('signup',{status:true})
    }
}

//login
exports.login=async(req,res,next)=>{
    let username=req.body.name
    let password=req.body.password
    const user = await usermodel.findOne({ name: username,password:password });
    if (!user) {
      res.render('login',{status:true})
    }
    else{
        console.log(user);
        req.session.user = user;
        req.session.userloggedIn = true;
        res.redirect('/')
    }
}

//add workout data
exports.workout=(req,res,next)=>{
    console.log(req.body);
    const workout=new workoutmodel({
        userid:req.body.userid,
        exersize:req.body.exersize,
        duration:req.body.duration,
        calorie:req.body.calorie,
        wdate:req.body.wdate
    })
    workout.save()
        .then(()=>{
            res.redirect('/')
        })
        .catch((err)=>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        })
}

//deleting data
exports.delete=(req,res,next)=>{
    let id=req.params.id
    workoutmodel.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.redirect('/')
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
}

//updating data
exports.update=(req,res,next)=>{
    let id=req.params.id
       console.log(id);
        workoutmodel.findByIdAndUpdate(id,req.body,{ useFindAndModify: false})
            .then((data)=>{
                if(!data){
                    res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                }else{
                        res.redirect('/')
                }
            })
            .catch((err)=>{
                res.status(500).send({ message : "Error Update user information"})
            })
}