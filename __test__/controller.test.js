const Controller = require('../app/controllers/controller.js');
const Driver = require('../app/models/models.js');

jest.mock('../app/models/models.js', () => {
  const mDriver = { save: jest.fn() };
  return jest.fn(() => mDriver);
});

describe('Creating Driver Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should create driver and send to MongoDB', () => {
    const mRes = { json: jest.fn() };
    const mDriver = new Driver();

    expect.assertions(3);
    const mReq = {
      body: {
        name: 'Jose da Silva Sauro',
        age: 23,
        gender: 'masculino',
        veichle: 'sim',
        cnhType: 'D',
        loaded: 'sim',
        truckType: '1',
        oLatitude: 1,
        oLongitude: 1,
        dLongitude: 2,
        dLatitude: 2,
        date: '14/02/2020',
      },
    };
    mDriver.save.mockResolvedValueOnce('saved driver');
    return Controller.create(mReq, mRes).then(() => {
      expect(Driver).toBeCalledWith({
        name: 'Jose da Silva Sauro',
        age: 23,
        gender: 'masculino',
        veichle: 'sim',
        cnhType: 'D',
        loaded: 'sim',
        truckType: '1',
        origin: {
          type: 'Point',
          coordinates: [1, 1],
        },
        destination: {
          type: 'Point',
          coordinates: [2, 2],
        },
        date: '14/02/2020',
      });
      expect(mDriver.save).toBeCalledTimes(1);
      expect(mRes.json).toBeCalledWith('saved driver');
    });
  });

  it('Should handle error if request body is empty', () => {
    const mReq = { body: {} };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Controller.create(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.status(400).json).toBeCalledWith({ message: 'Form content can not be empty' });
  });

  it('Should handle error if save driver failure', () => {
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mDriver = new Driver();
    const mError = new Error('database connection failure');

    expect.assertions(4);
    const mReq = {
      body: {
        name: 'Jose da Silva Sauro',
        age: 23,
        gender: 'masculino',
        veichle: 'sim',
        cnhType: 'D',
        loaded: 'sim',
        truckType: '1',
        oLatitude: 1,
        oLongitude: 1,
        dLongitude: 2,
        dLatitude: 2,
        date: '14/02/2020',
      },
    };
    mDriver.save.mockRejectedValueOnce(mError);
    return Controller.create(mReq, mRes).then(() => {
      expect(Driver).toBeCalledWith({
        name: 'Jose da Silva Sauro',
        age: 23,
        gender: 'masculino',
        veichle: 'sim',
        cnhType: 'D',
        loaded: 'sim',
        truckType: '1',
        origin: {
          type: 'Point',
          coordinates: [1, 1],
        },
        destination: {
          type: 'Point',
          coordinates: [2, 2],
        },
        date: '14/02/2020',
      });
      expect(mDriver.save).toBeCalledTimes(1);
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.status(500).send).toBeCalledWith({ message: mError.message });
    });
  });
});