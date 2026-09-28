import express from 'express'
import  morgan from 'morgan'
const app = express()

const port = 3000


// app.use(express.static('public'))

// app.use(express.json())


// app.use(express.urlencoded({
//     extended:true
// }))

function middleware1(req, res, next) {
    console.log('this is middleware 1')

    next()
}

function logger(req, res, next) {
    console.log(req.method)

    console.log(req.url)
    console.log(req.statusCode)

    next()

}

// app.use(middleware1)


app.get('/user', middleware1, logger, (req, res) => {

    // console.log(req.body)

    console.log('this is function logic.....')

    res.send('this is function logic')
})


app.get('/about', morgan("dev"),(req, res) => {
    console.log('this is about logic.....')
     res.send('this is function logic')
})

app.listen(port, () => {
    console.log('server has started at port : ', port)
})