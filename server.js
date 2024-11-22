const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/student', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const Student = require('./students');


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

app.post('/students', async (req, res) => {
  let student = new Student({name: req.body.name, age: req.body.age});
  student = await student.save();
  res.send(student);
});

app.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({error: 'Student not found'});
  }
  res.send(student);
});

app.put('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, {name: req.body.name, age: req.body.age}, {new: true});
  if (!student) {
    return res.status(404).json({error: 'Student not found'});
  }
  res.send(student);
});

app.delete('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).json({error: 'Student not found'});
  }
  res.status(204).send();
});