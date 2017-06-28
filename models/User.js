var jwt = require('jsonwebtoken');

//Secret for JWT.
var {secret} = require('./../config');

//User Array. This will mimmic a call to a DB to fetch users.
var users = [
  {id: 1, name: 'Hervinho', password: '1234'},
  {id: 2, name: 'Light Yagami', password: 'abcd'},
  {id: 3, name: 'Eren Jaeger', password: 'a1b2'}
];

//var secret = 'ue7r39r39484333-,';

function User(){
  //get all users.
	this.getall = function(res){
		//Fake database call to fetch all users.
    res.json(users);
	};

  //get a single user.
  this.getOne = function(id, res){
    var user;

		//Fake database call to fetch single users.
    for(x = 0; x < users.length; x++){
      if(users[x].id == id){
        user = users[x];
      }
    }

    if(user && user.id){
      res.json(user);
    }
    else{
      res.json({success: false, message: 'User not found.'});
    }

	};

  //Authenticate user.
  this.authenticate = function(userObj, res){
    var name = userObj.name;
    var password = userObj.password;
    var user, result, error;

    //Fake database call to fetch single users.
    for(x = 0; x < users.length; x++){
      if(users[x].name == name && users[x].password == password){
        user = users[x];
      }
    }

    if(user && user.id && user.name && user.password){
      //if such user exists, generate the token.
      var token = jwt.sign(user, secret, {
          expiresIn: "1h" // time before expiration
      });

      //Send user info along with the token.
      result = {
          success: true,
          message: 'Here is the token!',
          token: token
      };
      res.json(result);
    }
    else{
      error = {
        success: false,
        message: 'Authentication failed.'
      };
      res.json(error);
    }

  }
}

module.exports = new User();
