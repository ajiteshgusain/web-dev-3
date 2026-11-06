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
