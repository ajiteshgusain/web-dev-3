import  express  from "express"

const app=express()
import router from './routes/userRoute'
app.use(route)

const port=3000
app.listen(port,()=>{
    console.log('server  has at  port:',port)

})

