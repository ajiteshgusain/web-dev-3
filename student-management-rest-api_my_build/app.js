import   express  from  'express'
import studentRoutes  from  './routes/studentRoutes.js'
import  logger  from  './middleware/logger.js'


const  app=express();
const  port=3000;

app.use(express.json());
app.use(logger());
app.use('/students',studentRoutes);

app.use((req,res)=>{
    res.status(404).json({
        error:'routes  not  found'
    })
});


app.use((err,req,res,next)=>{
    console.error(err.stack);

    res.status(500).json({
        error:'internal  server  error'
    });
});

app.listen(port,()=>{
    console.log(`server  running  at http://localhost:${port}`);
});