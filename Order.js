// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  orderDetails: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

// controllers/orders.js
const express = require('express');
const router = express.Router();
const Orrder = require('../models/Order');
const Joi = require('joi');

const orderSchema = Joi.object().keys({
  userId: Joi.string().required(),
  restaurantId: Joi.string().required(),
  orderDetails: Joi.string().required()
});

router.post('/orders', async (req, res) => {
  const { error } = Joi.validate(req.body, orderSchema);
  if (error) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const order = new Order(req.body);
  try {
    await order.save();
    res.json({ message: 'Order created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});