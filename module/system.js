const mongoose = require('mongoose')

const system = new mongoose.Schema({
    systemname:{
        type:String,
        require:true
    },
    footer:{
        type:String
    },
    email:{
        type: Date,
        default: Date.now
    },
    phone:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true,
        unique:true
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


module.exports = mongoose.model('System',system)