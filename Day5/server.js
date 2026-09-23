// import express from 'express';

// import {
//     getuser,
//     createUser,
//     updateUser,
//     deleteuser
// } from '../controllers/user.js';

// const router = express.Router();

// router.get('/getuser', getuser);

// router.post('/createuser', createUser);

// router.put('/updateuser/:id', updateUser);

// router.delete('/deleteuser/:id', deleteuser);

// export default router;




import express from 'express'

const app = express()

import router from './routes/userRoute.js'

app.use(express.json())

app.use(router)

const port = 3000

app.listen(port, () => {
    console.log('server has started at port:', port)
})