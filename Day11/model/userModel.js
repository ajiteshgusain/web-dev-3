import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    { name:
        {
            type:string,
            require:true

        },
        
        email:{
            type:string,
            require:true,



        },
        
        password:
        {
            type:string,
            require:true

        },
        role:{
            type:string,
            require:true,
            enum:['Student','Teacher','Admin']
        }


    }   
)

const user=mongoose.model('User',userSchema)
export default user