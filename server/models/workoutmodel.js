var mongoose=require('mongoose')

var workoutschema=new mongoose.Schema({
    userid:{
        
    },
    exersize:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    calorie:{
        type:Number,
        required:true
    },
    wdate:{
        type:String,
        required:true
    }
})

const workout=mongoose.model('workout',workoutschema)

module.exports=workout