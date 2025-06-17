const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Create new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add student' });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  console.log('PUT /api/students/' + req.params.id);
  console.log('Body:', req.body);
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      console.log('Student not found.');
      return res.status(404).json({ error: 'Student not found' });
    }

    student.name = req.body.name;
    student.course = req.body.course;
    await student.save();

    res.json(student);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Server error while updating' });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

module.exports = router;
