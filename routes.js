//Load all models.
var User = require('./models/User');

var UserAPIs = function(express){
  //Show a random message on home page.
  express.get('/', function(req, res) {
    res.json({ message: 'Welcome to Home Page!!!' });
  });

  //get all users.
	express.get('/users/getAll/', function (req, res) {
		User.getall(res);
	});

  //get one user.
  express.get('/users/:id', function (req, res) {
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
