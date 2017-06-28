var jwt = require('jsonwebtoken');

//Load all models.
var User = require('./models/User');

//Secret for JWT.
var {secret} = require('./config');

//Authentication middleware.
function userAuth(req, res, next) {
  //Check request parameters for token.
  var token = req.body.token || req.query.token ||
    req.headers['x-access-token'];

  //decode the token.
  if(!token){
    var error = {
      success: false,
      message: 'No token provided.'
    };
    return res.status(403).send(error);
  }
  else{
    //verify secret in token and check expiration.
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything went well, save token to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
};

var UserAPIs = function(express){
  //Show a random message on home page.
  express.get('/', userAuth, function(req, res) {
    res.json({ message: 'Welcome to Home Page!!!' });
  });

  //get all users.
	express.get('/users/getAll/', userAuth, function (req, res) {
		User.getall(res);
	});

  //get one user.
  express.get('/users/:id', userAuth, function (req, res) {
    var id = req.params.id;
		User.getOne(id, res);
	});

  //Authenticate user.
  express.post('/authenticate', function (req, res) {
    var userObj = req.body;
		User.authenticate(userObj, res);
	});
};

module.exports = {
  configure: function(apiRoutes){
    UserAPIs(apiRoutes);
  }
};
