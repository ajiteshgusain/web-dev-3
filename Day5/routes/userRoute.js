import express  from  'express'
import { getuser } from '../controllers/user.js'

const router=express.Router()

// as  data  is recevied  from  front end
router.get("/user",getuser)
router.post('/user',createUser)

export default  router




