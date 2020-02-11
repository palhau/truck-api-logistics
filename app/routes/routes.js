module.exports = (app) => {
  const driver = require('../controllers/controller.js');

  app.post('/api/driver/create', driver.create);

  app.get('/api/driver/get-all-without-return', driver.findAll);

  app.get('/api/driver/get-all-drivers-per-period', driver.findAll);

  app.get('/api/driver/get-all-with-veichle', driver.findAll);

  app.get('/api/driver/get-routes-grouped', driver.findOne);

  app.put('/api/driver/update', driver.update); 

  app.delete('/api/driver/delete', driver.delete);
}