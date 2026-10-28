import User from "../model/userModel.js"

const createUser = async (req,res)=>{

    try {
        
        const {name, age, gender} = req.body

       if (!name ||!age || !gender){
            return res.status(404).json({
                message:"data did not found...",
                success:false
            })
        }

        let user = await User.create({name , age, gender})

         res.status(200).json({
            message:'data created successfully...',
            success:true,
            user
        })

    } catch (error) {

        res.status(500).json({
            message:'failed to create user...',
            error:error.message
        })


    }


}

export {createUser}


