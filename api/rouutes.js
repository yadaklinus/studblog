const express = require('express')
const routes = express.Router()
const modle = require('../module/article')


routes.post('/post',async (req,res)=>{
    let dataSaved = new modle({
        
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    try{
        const dataSaved = await data.save()
        res.status(200).json(dataSaved)
    }catch{
       
    }
})

routes.get('/getall', async (req,res)=>{
    const data = await modle.find()
    res.send(data)
})

routes.get('/get/:_id', async (req,res)=>{
    const unique = await modle.findById(req.params._id)
    res.send(unique)

    
    // try{
    //     const unique = await modle.findById(req.params.id)
    //     res.json(unique)
    // }catch(error){
    //     res.status(500).json({error:error.message})
    // }
})

routes.get('/update/:_id', async (req,res)=>{

    const up = await modle.findByIdAndUpdate(req.params.id,{title:"hi"})
    res.send("done")
})

routes.delete('/delete/:_id',(req,res)=>{
    res.send("/delete/:id")
})


module.exports = routes