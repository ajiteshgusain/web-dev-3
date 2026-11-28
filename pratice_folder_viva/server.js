import express from "express"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'welcome to express backend',
        success: true
    })
})

app.get('/contact', (req, res) => {
    res.send("<h1>this is contact page</h1>")
})

app.get('/about', (req, res) => {
    res.json({
        message: 'welcome i am the dangerous contact page',
        success: true
    })
})

let users = ["liv", "Selena", "lucia"]

app.get('/users', (req, res) => {
    res.status(200).json({
        message: 'data send successfully..!!',
        success: true,
        users
    })
})

app.post('/createuser', (req, res) => {
    let name = req.body.name

    if (!name) {
        return res.status(404).json({
            message: 'name not found',
            success: false,
        })
    }

    users.push(name)

    res.status(200).json({
        message: 'user created successfully...!!',
        success: true,
        users
    })
})

app.put('/updateuser', (req, res) => {
    console.log("first")

    let { name, newName } = req.body

    if (!name || !newName) {
        return res.status(404).json({
            message: "data not found",
            success: false
        })
    }

    let index = users.indexOf(name)

    if (index === -1) {
        return res.status(404).json({
            message: 'index not found',
            success: false
        })
    }

    users[index] = newName

    res.status(200).json({
        message: 'data updated successfully',
        success: true,
        users
    })
})

app.delete('/deleteuser', (req, res) => {
    console.log("first")

    // here i used destructuring
    let { name } = req.body

    let index = users.indexOf(name)

    if (index === -1) {
        return res.status(404).json({
            message: 'name not found',
            success: false
        })
    }

    users.splice(index, 1)

    res.status(200).json({
        message: 'user deleted ...!',
        success: true,
        users
    })
})

app.listen(3000, () => {
    console.log('server has started at port 3000')
})