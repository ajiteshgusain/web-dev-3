import  jwt  from "jsonwebtoken"
 

const auth = async (req,res,next)=>{
     
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(404).json({
                message: 'token did not found...',
                success:false
            })
        }

        let payload = await  jwt.verify(token, 'jwtkey' )

         console.log(payload) 

         req.role = payload.role
         req.userId = payload.userId

        next()

        

    } catch (error) {
        console.log(error)
        res.json({
            
            message:"internal server error...",error
        })
    }
}


const isStudent = async (req,res, next) =>{
    try {
        const role = req.role
        const userId = req.userId

        if(role !== 'Student'){
            return res.status(401).json({
                message:'you are not student....',
                success:false
            })
        }

        next()



    } catch (error) {
        console.log(error)
    }
}


const isTeacher = async (req,res, next) =>{
    try {
        const role = req.role
        const userId = req.userId

        if(role !== 'Teacher'){
            return res.status(401).json({
                message:'you are not Teacher....',
                success:false
            })
        }

        next()



    } catch (error) {
        console.log(error)
    }
}



export {auth , isStudent, isTeacher}