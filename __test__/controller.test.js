const mockingoose = require('mockingoose').default;

const { create, noLoaded, datedLoad, getVeichle, listOriginDestination, update} = require('../app/controllers/controller.js');
const model = require('../app/models/models.js')

jest.mock('../app/models/models.js', () => ({ Dirver: jest.fn() }));

describe('Controller', () => {
  let mRes;
  const mReq = { body: {
    name: "Antonio dos Santos",
      age: "27",
      gender: "masculino",
      veichle: "nao",
      cnhType: "D",
      loaded: "nao",
      truckType: 2,
      origin:{
      coordinates:[ -46.9213486, -23.7341936]
      },
      destination:{
        coordinates: [-46.9057519, -23.8529033]
      },
      date: "08/02/2020"
  }};
  beforeEach(() => {
    mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return the driver created', () => {
    create(mReq, mRes);
    expect(mRes.json()).toMatchObject();
    expect(mRes.status(500)).toBeCalledWith({ error: { message: "Some error ocurred while creating the driver." } });
  });
});
