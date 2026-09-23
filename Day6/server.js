import  express   from 'express'

const app=express()
const port=3000




app.post('/user',(req,res)=>{
    console.log(req.url)
    console.log(req.body)
    
})




app.listen(port,()=>{
    console.log('server   has  started at port',port)
})