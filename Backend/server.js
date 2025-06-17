const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ridarizwan1223:pak1234@cluster0.dysyfrw.mongodb.net/studentmanager');

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.listen(5000, () => console.log('Server running on 5000'));
