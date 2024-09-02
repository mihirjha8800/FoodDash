// models/Menu.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  menuItems: [{ type: String, required: true }],
  availability: { type: Boolean, required: true }
});

const Menu = mongoose.model('Menu', menuSchema);

// controllers/menus.js
const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.put('/menus/:restaurantId', async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const menu = await Menu.findOne({ restaurantId });
  if (!menu) {
    return res.status(404).json({ error: 'Menu not found' });
  }
  menu.menuItems = req.body.menuItems;
  menu.availability = req.body.availability;
  try {
    await menu.save();
    res.json({ message: 'Menu updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});