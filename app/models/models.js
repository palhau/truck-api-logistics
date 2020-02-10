const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
const Joi = require('@hapi/joi');

const TruckSchema = mongoose.Schema({
  name: Joi.string(),
  age: Joi.number().integer(),
  gender: Joi.string(),
  veichle: Joi.boolean().truthy('sim').falsy('no').sensitive(),
  cnhType: Joi.string(),
  loaded: Joi.boolean().truthy('sim').falsy('no').sensitive(),
  type: Joi.number().integer(),
  origin: {
    type: PointSchema,
    index: '2dsphere'
  },
  destination: {
    type: PointSchema,
    index: '2dsphere'
  },
  date: Joi.date().timestamp()
});

module.exports = mongoose.model('Truck', TruckSchema);