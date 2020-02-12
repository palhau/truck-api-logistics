# TRUCK API LOGISTICS

This is a REST API maded in nodejs to helps manipulate any database for logistics metters

## Getting Started

For use this API with another database you can change the link connecting in the database.config.js file inside the config folder.

### Prerequisites

First of all you need to install all de dependecies used in this API:
```
npm install
```

### Installing

You can also insert this API into your front-end project to make a website more robust and quite beautiful.
Below you can see a small example of the data update in MongoDB.

```
{
        "_id": "5e44315849e8112610c67e28",
        "name": "Antonio dos Santos",
        "age": 28,
        "gender": "masculino",
        "veichle": "nao",
        "cnhType": "D",
        "loaded": "nao",
        "truckType": 2,
        "date": "2020-12-02T03:00:00.000Z"
    }
```
For more informations visit the Documentation (https://documenter.getpostman.com/view/10332173/SzKN22W6?version=latest).

## Running the tests

On your terminal execute:

```
npm teste
```
and wait the jest finish the process.

## Built With

* [Express](http://expressjs.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/) - The databse used
* [NPM](https://www.npmjs.com/) - Dependency Management

## Versioning

We use [GitHub](https://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/palhau/truck-api-logistics/commits/master). 

## Author

* **Alan Palhau** - *Initial work* - [PurpleBooth](https://github.com/palhau)
