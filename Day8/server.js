import express from "express";

const app = express()

app.get('/user', (req, res) => {

    try {

        console.log('this is main logic')

        res.json({
            message: 'this is main logic...'
        })

    } catch (error) {

        res.json({
            message:'somthing went wrong....',
            error:error.message
        })

    }


})

function checkRoute(req,res, next){
    res.send('api did not defined....')

}

app.use(checkRoute)



const port = 3000

app.listen(port, () => {
    console.log('server has started at port : ', port);
})