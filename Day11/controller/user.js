import User from "../model/userModel.js"

const signup = async (req,res)=>{
    try {
        const {name, email, password, role} = req.body

        if(!name || !email || !password || !role){
            res.status(404).json({
                message:'data not found for signup',
                success:false
            })
        }




    } catch (error) {
        
    }
}