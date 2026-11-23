import express from 'express'
import connectDB from './database/mongodb.js'
import router from './routes/userRoutes.js'
import marksRouter from './routes/marksRoutes.js'


const app = express()

connectDB()
 
app.use(express.json())

app.use(marksRouter)

app.use(router)


const port = 3000

app.listen(port , ()=>{
    console.log('server has started at port : ', port)
})