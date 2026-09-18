import  express  from "express"

const app=express()
import router from './routes/userRoute.js'
app.use(express.json())
app.use(router)
const port=3000
app.listen(port,()=>{
    console.log('server  has at  port:',port)

})

