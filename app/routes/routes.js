module.exports = (app) => {
  const driver = require('../controllers/controller.js');

  app.post('/api/driver/create', driver.create);

  app.get('/api/driver/get-all-without-return', driver.noLoaded);

  app.get('/api/driver/get-all-drivers-per-period', driver.datedLoad);

  app.get('/api/driver/get-all-with-veichle', driver.getVeichle);

  app.get('/api/driver/get-routes-grouped', driver.listOriginDestination);

  app.put('/api/driver/update', driver.update); 

  app.delete('/api/driver/delete', driver.delete);
}