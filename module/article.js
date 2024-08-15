const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createdomPurify = require("dompurify")
const { JSDOM } = require("jsdom")
const dompurify = createdomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    markdown:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true,
        unique:true
    },
    sanitatisedhtml:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    createdBY:{
        type:String,
        required:true
    },
    authorID:{
        type:String,
        required:true
    }
})

articleSchema.pre("validate",function(next){
    if (this.title){
        this.slug = slugify(this.title,{lower:true,strict:true})
    }
    if(this.markdown){
        this.sanitatisedhtml = dompurify.sanitize(this.markdown)
    }
    next()
})

module.exports = mongoose.model('Article2',articleSchema)