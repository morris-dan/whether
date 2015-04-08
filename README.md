# whether

A submission for a position at a firm.

> Using your knowlegde of node.js, client side frameworks and using the [http://forecast.io] API create an application which when accessed via a url can be used to retrieve a weather forecast.

The application provides a route to retrieve Dark Sky forecast data at a lat/lng for the week.

The application provides a route to retrieve Dark Sky forecast data at a lat/lng for day of the week.

The application provides a route to retrieve Dark Sky forecast data at a lat/lng for today.

The application provides a method to convert a city name into lat/lng coordinates.

The application provides a method to determine the day of week of a unix timestamp.

The application uses the following node modules  Comprising modules have been chosen for their ubiquity, their road-handling abilities and general roadworthiness.

- **[nodejs](https://nodejs.org)** is the network daemon running the application as an http service.

- **[npm](https://www.npmjs.com)** is used to install packages used by the application.

- **[grunt](http://gruntjs.com)** is used to lint, run tests, and run a live update server.

- **[mocha](http://mochajs.org)** is used as the test runner.

- **[chai](http://chaijs.com)** is the assertion library used in the test runner.

- **[nock](https://github.com/pgte/nock)** is the http mocking library used to simulate api calls.

- **[express](http://expressjs.com)** is web application framework used.

Scaffolding generated via `sudo npm install -g generator-express` and `yo express`

Details @ https://github.com/petecoop/generator-express

## Getting Started
Install whether by cloning repo https://github.com/morris-dan/whether.

```bash
$ git clone https://github.com/morris-dan/whether
$ cd whether
$ npm install
```

Run whether using:

```bash
$ grunt
```

## Documentation
Use your browser or curl to hit the endpoints listed below in the examples once the sever is running.

## Examples

**Sydney**
- http://localhost:3000/weather/sydney
- http://localhost:3000/weather/sydney/today
- http://localhost:3000/weather/sydney/monday
- http://localhost:3000/weather/sydney/tuesday

**Brisbane**
- http://localhost:3000/weather/brisbane
- http://localhost:3000/weather/brisbane/today
- http://localhost:3000/weather/brisbane/monday
- http://localhost:3000/weather/brisbane/tuesday

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 Initial commit of app to the wide world

## License
Copyright (c) 2015 Dan Morris  
Licensed under the MIT license.
