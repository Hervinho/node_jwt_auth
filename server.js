var express = require('express');
var bodyParser = require("body-parser");
var morgan = require('morgan');
var app = express();

// get an instance of the router for api routes
var apiRoutes = express.Router();

var routes = require('./routes');

var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));//to log requests to the console

// apply the prefix /api to our routes.
app.use('/api', apiRoutes);

routes.configure(apiRoutes);

var server = app.listen(PORT, function(){
  console.log('Server listening on port ' + server.address().port);
});
