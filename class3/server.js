import  http from  'http'//  importing    http module(built-in)

const server=http.createServer((req,res)=>{
    // if (req.url==='/' && req.method=='GET'){
    //     res.end('<h1> welcome to  backend.</h1>')
    // }

    let  body=''
    if(req.url==='user' && req.method ==='POST'){
        req.on('data',(chunk)=>{
            body=body+chunk


        })

        req.on('end',()=>{
            res.writeHead(200,{'content-type':'application/json'})
            res.end(JSON.stringify({
                message:'data fetched successfully...',
                body,
                success:true
            }))
        })
    }
 
})  
const port=3000

server.listen(port,()=>{
    console.log('server  has created  at port',port)

})