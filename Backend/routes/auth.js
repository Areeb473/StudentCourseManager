const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) return res.status(401).json({ error: 'Invalid login' });

  const token = jwt.sign({ id: user._id }, 'secret123');
  res.json({ token });
});

module.exports = router;
