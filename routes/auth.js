const express = require('express')
const validator = require("validator")
const Article = require("./../module/article")
const Users = require("./../module/users")
//const article = require('')
const router = express.Router()
const crypto = require("crypto")
const isValidUser = require("../_functions/_validuser")



function sha1(x){
    return crypto.createHash('sha1').update(x,'binary').digest('hex')
}

router.get("/",(req,res)=>{
    res.redirect("/")
})

router.get("/login",(req,res)=>{
    let error = req.flash("error")
    res.render("login",{error:""})
})

router.get("/signup",(req,res)=>{
    let error = req.flash("error","ok")
    res.render("signup",{error})
})

router.post("/signup", async (req,res)=>{
    const {firstname,lastname,username,email,phone,password} = req.body

    //res.send(firstname+lastname+username+email+phone+password)
    let user_name = await Users.findOne({name:username})
    let user_email = await Users.findOne({email:email})
    
    
    if((user_name != null)){ 
        req.flash('error','username Taken')
        res.redirect('/auth/signup')
    }else if(user_email != null){
        req.flash('error','Email Taken')
        res.redirect('/auth/signup')
    }
    // }else{
    //     let users = new Users({
    //         name:username,
    //         email:email,
    //         phone:phone,
    //         password:password
    //     })
    //     try{
    //         users = await users.save()
    //         res.redirect("/process/login")
    //     }catch(e){ 
    //         console.log(e)
    //     }
    // }

    let user = new Users({
        firstname:firstname,
        lastname:lastname,
        username:username,
        email:email,
        phone:phone,
        password:sha1(password)
    })
    try{
        user = await user.save()
        res.redirect("/auth/login")
    }catch(error){
        res.redirect("/auth/login",{error})
    }
})

router.post("/login", async (req,res)=>{
    let user
    const {username,password} = req.body
    if(validator.isEmail(username)){
        user = await Users.findOne({email:username})
    }else{
        user = await Users.findOne({username:username})
    }
    
    
    
    if(isValidUser(username,sha1(password),user)){
        //res.redirect("/user")
        req.session.LogedinUser = user
        res.redirect("/user")
    }else{
        res.redirect("/auth/login")
    }
    
    
    
})


module.exports = router