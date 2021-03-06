const Driver = require('../models/models.js');

// Create and Save a new driver
exports.create = (req, res) => {

  const { oLongitude, oLatitude } = req.body;
  const { dLongitude, dLatitude } = req.body;

  // Validade request
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "Form content can not be empty"
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
  return driver.save()
    .then(data => {
      res.json(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the driver."
      });
    });
};

// Retrieve and return all drivers from the database without load.
exports.noLoaded = (req, res) => {
  Driver.find({ loaded: 'nao' })
    .then(drivers => {
      res.json(drivers);
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error ocurred while retrieving the drivers."
      });
    });
};

// Retrieve and return the amount of drivers that had load, grouped by date.
exports.datedLoad = (req, res) => {
  Driver.aggregate([
    { $match: { loaded: 'sim' } },
    { $group: { _id: { $dateToString: { format: "%d-%m-%Y", date: "$date" } } } }
  ])
    .then(drivers => {
      res.json(drivers);
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error ocurred while retrieving the drivers."
      });
    });
};

// Retrieve and return all drivers from the database with a veichle.
exports.getVehicle = (req, res) => {
  Driver.find({ veichle: 'sim' })
    .then(drivers => {
      res.json(drivers.length);
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error ocurred while retrieving the drivers."
      });
    });
};

// Retrieve and return the amount of drivers that had load, grouped by date.
exports.listOriginDestination = (req, res) => {
  Driver.aggregate([
    { $match: { truckType: { $gte: 1 } } },
    {
      $group:
      {
        _id: "$truckType",
        locations: {
          $push: {
            origin:
              { coordinates: ["$oLongitude", "$oLatitude"] },
            destination:
              { coordinates: ["$dLongitude", "$dLatitude"] }
          }
        }
      }
    },
    { $sort: { truckType: -1 } }
  ])
    .then(drivers => {
      res.json(drivers);
    }).catch(err => {
      res.status(500).json({
        message: err.message || "Some error ocurred while retrieving the drivers."
      });
    });
};

// Update a driver identified by the driverId in the request
exports.update = (req, res) => {
  //Validade request
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "driver form can not be empty"
    });
  }

  //Find a driver and update it with the request body
  Driver.findByIdAndUpdate(req.params.driverId, {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    veichle: req.body.veichle,
    cnhType: req.body.cnhType,
    loaded: req.body.loaded,
    truckType: req.body.truckType,
    date: req.body.date
  }, { new: true })
    .then(driver => {
      if (!driver) {
        return res.status(404).json({
          message: "driver not found with id " + req.params.driverId
        });
      }
      res.json(driver);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "driver not found with id " + req.params.driverId
        });
      }
      return res.status(500).json({
        message: err.message || "Error updating driver with id " + req.params.driverId
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