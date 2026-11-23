import User from "../model/userModel.js"

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

const signup = async (req,res)=>{
    try {
        const {name, email, password , role} = req.body  

      

        if(!name || !email || !password || !role){
            return res.status(404).json({
                message:"data not found for signup",
                success:false
            })
        }
      

        let user = await User.findOne({email})

        console.log(user)

        if(user){
            return res.status(403).json({
                message:'user already exist try different email id',
                success:false
            })
        }


        const hashpassword  = await bcrypt.hash(password, 10)


        user = await User.create({
            name, password : hashpassword, email, role
        })

           


        return res.status(201).json({
            message:'user created successfully....',
            success:true,
            user
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'internal server error',error,
            success:false
        })
    }
}


const login = async (req,res)=>{
    try {
        const {email , password} = req.body


        if(!email || !password){
            return res.status(404).json({
                message:'data not found for login...',
                success:false
            })
        }




         let user = await User.findOne({email})

         if(!user){
            return res.status(401).json({
                message:'user did not found...',
                success:false
            })
         }


         if(await bcrypt.compare(password, user.password)){


           let token = await  jwt.sign(
                {
                    userId : user._id,
                    role : user.role
                },
                'jwtkey',
                {
                    expiresIn : '3h'
                }
            )

            

            res.status(200).json({
                message:'login successfully...',
                success:true,
                user,
                token
            })


         }else{
            return res.status(401).json({
                message:'invalid password',
                success:false
            })


         }




    } catch (error) {
        res.status(500).json({
            message:'failed to login...',
            success:false
        })
    }
}

export { signup , login}