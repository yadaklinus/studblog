const express = require('express')
const Article = require("./../module/article")
const Users = require("../module/users")
//const article = require('')
const router = express.Router()



router.get("/all", async (req,res)=>{
    let articles = await Article.find().sort({createAt:'desc'})
    res.json(articles)
})


router.get("/allBlog", (req,res)=>{
    res.render('articles/allBlog',{
        title:"Blog"
    })
})

router.put("/edit/:slug", async (req,res)=>{
    let article = await Article.findById(req.params.id)
    res.render("articles/edit",{article: article})
})

router.get("/:_id", async (req,res)=>{
    let article =  await Article.findById(req.params._id)
    if(article == null) res.redirect("/")
    res.render('articles/inpost',{article:article})
})

router.delete("/:id", async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

router.get("/al", async (req,res)=>{
    // const articles = await Article.find().sort({createAt:'desc'})
    // res.render('articles/allBlog',{
    //     articles:articles,
    //     title:"Blog"
    // })
    res.send("hi")
})


router.post('/send', async (req,res)=>{
    let article = new Article({
        
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    try{
        article = await article.save()
        res.redirect(`/article/${article.slug}`)
    }catch(e){
        console.log(e)
        res.render('articles/new',{ article: article })
    }
    
})

router.get("/profile/:username", async (req,res)=>{
    // let user = await Users.findOne({username:req.params.username})
    // res.send(user)
    res.redirect("/")
})

module.exports = router