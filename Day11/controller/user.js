import user from   './database/userModel.js'

const signup=(req,res)=>{
    try{
        const{name,email,password,role}=req.body
        if (!name || !email || !password || !role ){
            res.status(404).json{

            }


        }

    }
    catch{

    }
}