// // let  operation=process.argv[2]
// // let  num1=Number(process.argv[3])
// // let  num2=Number(process.argv[4])


// // // Index 0 and 1 are hidden system paths (Node itself and your file path).

// // // Index 2, 3, and 4 are your custom inputs!



// // if (operation === 'add'){
// //     console.log(num1+num2)
// // }else if(operation === 'sub'){
// //     console.log(num1-num2)
// // }




// //----------------------------------------------------------------------------------------

// import    http from 'http'

// const server=http.createServer((req,res)=>{
//    //  handle   get  request  for the  home page
//     if(req.url==='/' &&  req.method==='GET'){

//         res.writeHead(200,{'content-Type':'text/html'});
//         res.end('<h1>welcome  to  backend   now  you alive.</h1>');
//     }

// //  handle   get  request  for  the    the aboutwebpage
//     else if(req.url ==='/about' && req.method ==='GET'){
//         res.writeHead(200,{'Content-Type':'text/html'});
//         res.end('<h1>this  is  about page</h1>');
// }
 

//    else if(req.url==='/contact' &&  req.method==="GET"){
//     res.writeHead(200,{'Content-Type':'application/json'});

//     res.end(JSON.stringify({
//         message:'this is the contact page',
//         success:true
//     }))
//    }

//    else{
//     res.writeHead(404,{'Content-Type':'text/html'});
//     res.end('<h1>404: page  not  found</h1>');

//    }

// })

// const port=3000;
// server.listen(port,()=>{
//     console.log('server has  started at  port:',port);
// })





//---------------------------------------------------------------------------
// day3

import  express  from  'express'

const  app=express()

app.use(express.json())

let users=['Ankit','Rahul','Nandan','Jigar']

app.get('/users',(req,res)=>{
    res.status(200).json({
        message:'data send  successfully',
        success:true,
        users:users

    })
})

app.post('/createuser',(req,res)=>{
    let name=req.body.name
    if(!name){
        return res.status(404).json({
            message:'name  not  found',
            success:false
        })
    }
    users.push(name)
    res.status(200).json({
    message:'user created successfully',
    users  })


  
})

app.put('/upadateuser',(req,res)=>{
    let {name, newName}=req.body
    if (!name ||  !newName){
        return res.status(404).json({
            message:'data  not foudn for update...',
            success:false
        })
    }
    let index=users.indexOf(name)
    if (index===-1){
        return  res.status(403).json({
        message:'name is  not  found',
        success:false
            })
        }

        users.splice(index, 1)
        res.status(200).json({
            message:'user  deleted',
            success:true,
            users

        })


    
   })
app.delete('/deleteuser',(req,res)=>{
    let  {name}=req.body
    let index=users.indexOf(name)

    if(index===-1){
        return res.status(403).json({
            message:'name not found',
            success:false
        })
    }


users.splice(index,1)
res.status(200).json({
    message:'user deleted...',
    success:true,
    users
      })
})

const port=3000
app.listen(port,()=>{
    console.log('server has  started  in port',port)
})