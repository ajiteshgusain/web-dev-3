import   express from  'express'

const app=express()

app.use(express.json())
app.get('/',(req,res)=>{
    //res.send('<h1> welcome to express backend')
    res.json({
        message:'welcome  to express'
    })


})


app.post('/user',(req,res)=>{
    let name=req.body.name

})

app.listen(3000,()=>{
    console.log('server created at port',3000)
})