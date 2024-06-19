const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HeadOfDepartment = require('./models/headOfDepartment'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hodDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// CRUD routes for Head of Department

// Create
app.post('/api/hod', async (req, res) => {
  try {
    const hod = new HeadOfDepartment(req.body);
    await hod.save();
    res.status(201).send(hod);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read All
app.get('/api/hod', async (req, res) => {
  try {
    const hods = await HeadOfDepartment.find();
    res.status(200).send(hods);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read One
app.get('/api/hod/:id', async (req, res) => {
  try {
    const hod = await HeadOfDepartment.findById(req.params.id);
    if (!hod) return res.status(404).send('The HOD with the given ID was not found.');
    res.status(200).send(hod);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
app.put('/api/hod/:id', async (req, res) => {
  try {
    const hod = await HeadOfDepartment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hod) return res.status(404).send('The HOD with the given ID was not found.');
    res.status(200).send(hod);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete
app.delete('/api/hod/:id', async (req, res) => {
  try {
    const hod = await HeadOfDepartment.findByIdAndRemove(req.params.id);
    if (!hod) return res.status(404).send('The HOD with the given ID was not found.');
    res.status(200).send(hod);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
