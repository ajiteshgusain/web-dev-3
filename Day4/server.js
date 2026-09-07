import   express from  'express'

const app=express()

// app.use(express.json())
// app.get('/',(req,res)=>{
//     //res.send('<h1> welcome to express backend')
//     res.json({
//         message:'welcome  to express'
//     })


// })


// app.post('/user',(req,res)=>{
//     let name=req.body.name
//     console.log(name)

//     res.status(200).json({
//         message:'data recieved successfully...',
//         success:true
//     })

// })

let user=['ajitesh','abhi','mummy','papa']

app.get('/getuser',(res,req)=>{
    res.status(200).json({
        message:'data  recived  successfully...',
        user
    })
})

app.listen(3000,()=>{
    console.log('server created at port',3000)
})