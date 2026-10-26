import express from 'express'

const app = express()

import connectDB from './database/mogodb.js'

connectDB()

const port  = 3000


app.listen(port, ()=>{
    console.log('server has started at port : ', port)
})
