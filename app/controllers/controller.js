const Driver = require('../models/models.js');

// Create and Save a new driver
exports.create = (req, res) => {

  const { oLongitude, oLatitude } = req.body;
  const { dLongitude, dLatitude } = req.body;

  // Validade request
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "Form content can't be empty"
    });
  }

  //Create a driver
  const driver = new Driver({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    veichle: req.body.veichle,
    cnhType: req.body.cnhType,
    loaded: req.body.loaded,
    truckType: req.body.truckType,
    origin: {
      type: 'Point',
      coordinates: [oLongitude, oLatitude]
    },
    destination: {
      type: 'Point',
      coordinates: [dLongitude, dLatitude]
    },
    date: req.body.date
  });

  //Save driver in the database
  driver.save()
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error ocurred while creating the driver."
      });
    });
};

// Retrieve and return all drivers from the database.
exports.findAll = (req, res) => {
  Driver.find()
    .then(drivers => {
      res.send(drivers);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving the drivers."
      });
    });
};

// Find a single driver with a driverId
exports.findOne = (req, res) => {
  Driver.findById(req.params.driverId)
    .then(driver => {
      if (!driver) {
        return res.status(404).send({
          message: "driver not found with id " + req.params.driverId
        });
      }
      res.send(driver);
    }).catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "driver nopt found with id " + req.params.driverId
        });
      }
      return res.status(500).send({
        message: "Error retrieving driver with id " + req.params.driverId
      });
    });
};

// Update a driver identified by the driverId in the request
exports.update = (req, res) => {
  //Validade request
  if (!req.body.content) {
    return res.status(400).send({
      message: "driver content can not be empty"
    });
  }

  //Find a driver and update it with the request body
  Driver.findByIdAndUpdate(req.params.driverId, {
    title: req.body.title || "Untitled driver",
    content: req.body.content
  }, { new: true })
    .then(driver => {
      if (!driver) {
        return res.status(404).send({
          message: "driver driver found with id " + req.params.driverId
        });
      }
      res.send(driver);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "driver not found with id " + req.params.driverId
        });
      }
      return res.status(500).send({
        message: "Erro updating driver with id " + req.params.driverId
      });
    });
};

// Delete a driver with the specified driverId in the request
exports.delete = (req, res) => {
  Driver.findByIdAndDelete(req.params.driverId)
    .then(driver => {
      if (!driver) {
        return res.status(404).send({
          message: "driver not found with id " + req.params.driverId
        });
      }
      res.send({ message: "driver deleted Sucessfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "driver not found with id " + req.params.driverId
        });
      }
      return res.status(500).send({
        message: "Could not delete driver with id " + req.params.driverId
      });
    });
};