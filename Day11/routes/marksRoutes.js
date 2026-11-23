import express from "express";
import { createMarks, showMarks } from "../controller/Marks.js";
import { auth, isStudent, isTeacher } from "../middleware/auth.js";

const marksRouter = express.Router()

marksRouter.get('/marks', auth ,  isStudent,  showMarks)

marksRouter.post('/marks', auth, isTeacher,   createMarks) 


export default marksRouter