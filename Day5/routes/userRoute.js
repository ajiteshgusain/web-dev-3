// import express  from  'express'
// import { getuser } from '../controllers/user.js'

// const router=express.Router()

// // as  data  is recevied  from  front end
// router.get("/user",getuser)
// router.post('/user',createUser)

// export default  router



import express from 'express'
import { 
    getuser, 
    createUser, 
    updateUser, 
    deleteuser 
} from '../controllers/user.js'

const router = express.Router()

router.get('/user', getuser)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteuser)

export default router

