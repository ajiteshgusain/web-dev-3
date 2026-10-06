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