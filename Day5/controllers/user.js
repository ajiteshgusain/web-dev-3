import fs  from  'fs'

const getuser=((req,res)=>{

    let data=fs.readFileSync('./database/data.json','utf-8')

    res.status(200).json({
        message:'data recevied  successfully...',
        success:true

    })
})

export {getuser}