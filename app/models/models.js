const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DriverSchema = mongoose.Schema({
  name: {type: String , required: true},
  age: { type: Number, min: 18, required: true},
  gender: {type: String , required: true} ,
  veichle: {type: String, enum:['sim', 'nao'] , required: true},
  cnhType: {type: String, enum:['C','D','E'] , required: true},
  loaded: {type: String, enum:['sim', 'nao'] , required: true},
  truckType: {type: Number, enum:[1,2,3,4,5], required: true },
  origin: {
    type: PointSchema,
    index: '2dsphere'
  },
  destination: {
    type: PointSchema,
    index: '2dsphere'
  },
  created_at: {type: Date, default: new Date().getTime()}
});

module.exports = mongoose.model('Driver', DriverSchema);