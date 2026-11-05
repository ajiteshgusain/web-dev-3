import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        mongoose.connect('mongodb://localhost:27017/Robotics')
        console.log('mongodb database connected successfully....')

    }catch(error){
        console.log('failed to connect to database!!!')

    }
}

export default connectDB