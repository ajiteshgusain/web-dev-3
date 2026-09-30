import  express  from 'express';


 const app=express()

  const port=3000

  app.get('user',(req,res)=>{
    console.log(' this main logic');
  })

  app.listen()