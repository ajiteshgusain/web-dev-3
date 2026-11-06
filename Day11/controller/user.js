import User from "../model/userModel.js"

import bcrypt from 'bcrypt'

const signup = async (req,res)=>{
    try {
        const {name, email, password, role} = req.body

        if(!name || !email || !password || !role){
            res.status(404).json({
                message:'data not found for signup',
                success:false
            })
        }


    let user  = await  User.findOne({email})



    if(user){
        return res.status(400).json({
            message:'user already exist by this email...',
            success:false
        })
    }   

    let hashpassword = await bcrypt.hash(password, 10)

    user = await User.create({
        name, email, role, password : hashpassword
    })



    } catch (error) {
        res.status(500).json({
            message:'failed to create user',error,
            success:false
        })
    }
}

const login = async (req,res)=>{
    try {
        const {email , password} = req.body


    if(!email || !password){
        return res.status(404).json({
            message:'data not found for login',
            success:false
        })
    }

    let user = await User.findOne({email})

    if(!user){
        return res.status(404).json({
            message:'user did not found...',
            success:false
        })
    }

    if(bcrypt.compare(password, user.password)){

        res.status(200).json({
            message:'user login....',
            success:true
        })


    }else{
        return res.status(403).json({
            message:'invalid password',
            success:false
        })
    }



    } catch (error) {
        return res.status(500).json({
            message:'internal server error',
            success:false
        })
    }
}


 export {signup , login}