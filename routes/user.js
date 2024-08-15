const express = require("express")
const routes = express.Router()
const Article = require("../module/article")
const Users = require("../module/users")

routes.get("/", async (req,res)=>{
    const user = req.session.LogedinUser
    if(!user) res.redirect("/")
    const articles = await Article.find().sort({createAt:'desc'}).limit(5)
    
    
    res.render("user/index",{articles:articles,user:user})
})

routes.get("/new",(req,res)=>{
    const user = req.session.LogedinUser
    if(!user) res.redirect("/")
    res.render("user/newnew",{user:user})
})

routes.get("/allBlog", async (req,res)=>{
    const user = req.session.LogedinUser
    if(!user) res.redirect("/")
    let articles = await Article.find().sort({createAt:'desc'})
    res.render('user/allBlog',{
        articles:articles,
        title:"Blog"
    })
})

routes.delete("/delete/:id", async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/user/myblogs")
})



routes.get("/edit/:_id", async (req,res)=>{
    const user = req.session.LogedinUser
    if(!user) res.redirect("/")
    let article = await Article.findOne({_id:req.params._id})
    res.render("user/edit",{
        id:req.params._id,
        title:article.title,
        category:article.category,
        description:article.description,
        markdown:article.markdown
    })
})

routes.post("/edit/:_id", async (req,res)=>{
    const user = req.session.LogedinUser
    if(!user) res.redirect("/")
    let article = await Article.findOne({_id:req.params._id})
    const {title,description,category,markdown} = req.body
    await Article.findByIdAndUpdate(req.params._id,{title:title,description:description,category:category,markdown:markdown})
    res.redirect("/user/myblogs")
})

routes.get("/myblogs", async (req,res)=>{
    const user = req.session.LogedinUser
    if(!user) res.redirect("/")
    let articles = await Article.find().sort({createAt:'desc'})
    res.render('user/myblog',{
        articles:articles,
        title:"Blog",
        user:user
    })
})

routes.post("/new", async (req,res)=>{
    const user = req.session.LogedinUser
    if(!user) res.redirect("/")
    const {title,description,author,authorid,category,markdown} = req.body
    let article = new Article({
        title:title,
        description:description,
        markdown:markdown,
        category:category,
        createdBY:author,
        authorID:authorid
    })
    try{
        article = await article.save()
        res.redirect("/user")
    }catch(error){
        console.error(error)
    }
})

module.exports = routes