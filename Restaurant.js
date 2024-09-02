// models/Restaurant.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const restaurantSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

restaurantSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// controllers/auth.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const restaurant = await Restaurant.findOne({ email });
  if (!restaurant) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const isValid = await restaurant.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  // Generate a JSON Web Token (JWT) for authentication
  const token = jwt.sign({ restaurantId: restaurant._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});