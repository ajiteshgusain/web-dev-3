import { json } from 'express'
import fs  from  'fs'

const getuser=((req,res)=>{

    let data=fs.readFileSync('./database/data.json','utf-8')
    
    data=JSON.parse(data)
    
    res.status(200).json({
        message:'data recevied  successfully...',
        success:true,
        data

    })
})


const  createUser=(req,res)=>{
    let {name,age,id}=req.body
    if (!name || !age ||id){
        res.status(404).json({
            message:'data not found for  createUser',
            success:false
        })
    }


    let data =fs.readFileSync('./database/data.json','utf-8')

    data=json.parse(data)
    data.push({name,age,id})
    fs.writeFileSync('./database/data.json',JSON.stringify(data,null,3))
}

