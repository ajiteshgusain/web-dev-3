import   express from  'express'

const app=express()

app.get('/',(req,res)=>{
    res.send('<h1> welcome to  backend')
}
)


app.listen(3000,()=>{
    console.log('server created at port',3000)
})