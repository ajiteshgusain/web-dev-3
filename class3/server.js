import  http from  'http'//  importing    http module(built-in)

const server=http.createServer((req,res)=>{
    if (req.url==='/' && req.method=='GET'){
        res.end('<h1> welcome to  backend.</h1>')
    }

})
const port=3000

server.listen(port,()=>{
    console.log('server  has created  at port',port)

})