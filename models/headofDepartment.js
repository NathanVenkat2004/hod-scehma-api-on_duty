const mongoose = require('mongoose');

const hodSchema = new mongoose.Schema({
  employeeid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
  },
  department: {
    type: String,
    required: true,
    enum: [
      'B.Tech Artificial Intelligence and Data Science',
      'B.E Computer Science and Engineering',
      'B.E Electronics and Communication Engineering',
      'B.E Mechanical Engineering',
      'B.E Civil Engineering',
      'CSBS'
    ]
  },
  password: {
    type: String,
    required: true
  }
});

const HeadOfDepartment = mongoose.model('HeadOfDepartment', hodSchema);

module.exports = HeadOfDepartment;
