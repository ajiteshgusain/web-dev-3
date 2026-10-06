const express = require('express');
const students = require('../data/students');

const router = express.Router();

function findStudentById(id) {
  return students.find((student) => student.id === Number(id));
}

function validateStudentInput(req, res, next) {
  const { name, course } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      error: 'name is required and must be a non-empty string'
    });
  }

  if (typeof course !== 'string' || course.trim() === '') {
    return res.status(400).json({
      error: 'course is required and must be a non-empty string'
    });
  }

  next();
}

// GET /students - return all students
router.get('/', (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - return one student
router.get('/:id', (req, res) => {
  const student = findStudentById(req.params.id);

  if (!student) {
    return res.status(404).json({
      error: 'Student not found'
    });
  }

  res.status(200).json(student);
});

// POST /students - create a student
router.post('/', validateStudentInput, (req, res) => {
  const nextId = students.length === 0
    ? 1
    : Math.max(...students.map((student) => student.id)) + 1;

  const newStudent = {
    id: nextId,
    name: req.body.name.trim(),
    course: req.body.course.trim()
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PUT /students/:id - update a student
router.put('/:id', validateStudentInput, (req, res) => {
  const student = findStudentById(req.params.id);

  if (!student) {
    return res.status(404).json({
      error: 'Student not found'
    });
  }

  student.name = req.body.name.trim();
  student.course = req.body.course.trim();

  res.status(200).json(student);
});

// DELETE /students/:id - delete a student
router.delete('/:id', (req, res) => {
  const studentIndex = students.findIndex(
    (student) => student.id === Number(req.params.id)
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      error: 'Student not found'
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    message: 'Student deleted successfully',
    student: deletedStudent
  });
});

module.exports = router;
