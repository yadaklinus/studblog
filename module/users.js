const mongoose = require('mongoose')

const users = new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
       
    },
    password:{
        type:String,
        require:true
    }
    // category:{
    //     type:String,
    //     require:true
    // },
    // createdBY:{
    //     type:String,
    //     required:true
    // }
})


module.exports = mongoose.model('users9990',users)