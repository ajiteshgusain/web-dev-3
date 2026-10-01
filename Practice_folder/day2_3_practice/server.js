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

import    http from 'http'

const server=http.createServer((req,res)=>{
   //  handle   get  request  for the  home page
    if(req.url==='/' &&  req.method==='GET'){

        res.writeHead(200,{'content-Type':'text/html'});
        res.end('<h1>welcome  to  backend   now  you alive.</h1>');
    }

//  handle   get  request  for  the    the aboutwebpage
    else if(req.url ==='/about' && req.method ==='GET'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>this  is  about page</h1>');
}
 

   else if(req.url==='/contact' &&  req.method==="GET"){
    res.writeHead(200,{'Content-Type':'application/json'});

    res.end(JSON.stringify({
        message:'this is the contact page',
        success:true
    }))
   }

   else{
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end('<h1>404: page  not  found</h1>');

   }

})

const port=3000;
server.listen(port,()=>{
    console.log('server has  started at  port:',port);
})





//---------------------------------------------------------------------------
// day3
