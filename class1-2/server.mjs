// const sum=require('./math').sum
// const total=sum(10,20);

// console.log(`sum of the numbers:${total}`);


// const multiply=require('./math').multiply
// const product=multiply(10,20);

// console.log(`product of the numbers:${product}`);

//const {sum,multiply}=require('./math')
// this we do  importing in react  for multiple functions   


// this we do  importing in react  for single  function   

//import sum from './math.mjs'; 
// console.log(sum(1,2));
//console.log(multiply(2,4));


//installs all dependencies of a Node. js project.
// npm init -y



// import  os from 'os'

// const  os=require('os')



//  os module
// import os from 'os'
// // console.log(os.type(),os.totalmem())
// console.log(os.totalmem()/1024/1024/1024)
// console.log(os.uptime()/60/60)


// //  path  module
// import path from 'path'
// // '.web dev-3/child.mjs'

// console.log(path.sep)
// console.log(path.basename('.web dev-3/child.mjs'))
// console.log(path.extname('.web dev-3/child.mjs'))

// console.log(path.dirname('web dev-3/child.mjs'))

// console.log(path.resolve('dev-3/child.mjs'))

import { error } from 'console'
import fs from 'fs'

fs.writeFile('./web dev-3/index.html','<p> i am  Ajit',(error)=>{
    if (error){
        console.log(error)
        return
    }
})



fs.mkdir('./web dev-3/newfile',{recursive:true},error=>{
    if (error){
        console.log(err)
        return
    }
})