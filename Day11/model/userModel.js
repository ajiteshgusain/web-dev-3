import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    { 
        name: {
            type: String, // Capitalized S
            required: true // Tip: Mongoose uses "required", not "require"
        },
        
        email: {
            type: String, // Capitalized S
            required: true
        },
        
        password: {
            type: String, // Capitalized S
            required: true
        },
        
        role: {
            type: String, // Capitalized S
            required: true,
            enum: ['Student', 'Teacher', 'Admin']
        }
    }   
)

const user = mongoose.model('User', userSchema)
export default user 




// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//     name: {
//         type:String,
//         require:true
//     },
//     email:{
//         type:String,
//         require:true,
//     },
//     password:{
//         type:String,
//         require:true
//     },
//     role:{
//         type:String,
//         require:true,
//         enum:['Student', 'Teacher', 'Admin']
//     }
// })

// const User = mongoose.model('User', userSchema)

// export default User