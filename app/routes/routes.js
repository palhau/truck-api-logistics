module.exports = (app) => {
  const driver = require('../controllers/controller.js');

  app.post('/truck-driver/create', driver.create);

  app.get('/truck-driver/get-all-without-return', driver.noLoaded);

  app.get('/truck-driver/get-all-drivers-per-period', driver.datedLoad);

  app.get('/truck-driver/get-all-with-vehicle', driver.getVehicle);

  app.get('/truck-driver/get-routes-grouped', driver.listOriginDestination);

  app.put('/truck-driver/:driverId', driver.update); 

  app.delete('/truck-driver/:driverId', driver.delete);
}