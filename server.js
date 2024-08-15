const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const Article = require("./module/article")
const Auth = require("./routes/auth")
const articleRouter = require('./routes/artticle')
const methodOver = require('method-override')
const UsersPath = require("./routes/user")
const app = express()
const flash = require("connect-flash")
const path = require("path")
const PORT = 3009
const SystemName = "Stud Blog"
require("dotenv").config()




mongoose.connect(process.env.Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.set('view engine','ejs')
app.use(flash())
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use(methodOver("_method"))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false
}))



app.get("/", async (req,res)=>{
    const articles = await Article.find().sort({createAt:'desc'}).limit(5)
    res.render('articles/index',{
        articles:articles,
        title:"Blog",
        systemName:SystemName
    })
})
app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

app.use("/article",articleRouter)
app.use("/auth",Auth)
app.use("/user",UsersPath)
app.use(express.static(path.join('public')))
app.listen(PORT,()=>{
    console.log("running")
})