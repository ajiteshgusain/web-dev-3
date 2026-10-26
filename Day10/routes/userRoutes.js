import express   from  'express'
import  {creatUser} from '../controller/user'


const router=express.Router()

router.post('/user',creatUser)
export default router