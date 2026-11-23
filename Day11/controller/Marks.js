import Marks from "../model/marksModel.js"

const showMarks = async (req,res)=>{
    try {
        let usermarks = await Marks.find()

        res.status(200).json({
            message:'marks found successfully...',
            success:true,
            usermarks
        })


    } catch (error) {
        res.status(500).json({
            message:'internal server error',
            success:false
        })
    }
}


const createMarks = async (req,res)=>{
    try {
        const {name, marks} = req.body

        let userMarks = await Marks.create({name, marks})

        res.status(201).json({
            message:'marks created successfully...',
            success:true,
            userMarks
        })


    } catch (error) {
        
        console.log(error)

         res.status(500).json({
            message:'internal server error',
            success:false 
        })
    }
}


export { showMarks, createMarks}