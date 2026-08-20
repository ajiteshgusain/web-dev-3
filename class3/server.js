import  http from  'http'//  importing    http module(built-in)

const server=http.createServer((req,res)=>{

})
const port=3000

server.listen(port,()=>{
    console.log('server  has created  at port',port)

})