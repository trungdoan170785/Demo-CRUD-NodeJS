const mongoose = require('mongoose');
const student
    = new mongoose.Schema({
    name: String, age: Number, id: Number
});

const Student = mongoose.model('student', student);

module.exports = Student;