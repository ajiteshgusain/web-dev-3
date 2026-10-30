import express from 'express'
import connectDB from './database/mongodb.js'
import router from './routes/userRoutes.js'

const app = express()



connectDB()
app.use(express.json())
app.use(router)
const port  = 3000


app.listen(port, ()=>{
    console.log('server has started at port : ', port)
})



// import express from 'express'
// import connectDB from './database/mongodb.js'
// import router from './routes/userRoutes.js'

// const app = express()

// // 1. Connect to MongoDB database
// connectDB()

// // 2. Middleware to parse incoming JSON request bodies
// app.use(express.json())

// // 3. Mount the user routes
// app.use(router)

// const port = 3000

// app.listen(port, () => {
//     console.log('server has started at port : ', port)
// })