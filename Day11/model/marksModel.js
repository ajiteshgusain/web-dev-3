import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    marks:{
        type:Number,
        require:true
    }
})

const Marks = mongoose.model('Marks', marksSchema)

export default Marks