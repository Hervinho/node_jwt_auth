//User Array. This will mimmic a call to a DB to fetch users.
var users = [
  {id: 1, name: 'Hervinho'}, {id: 2, name: 'Light Yagami'}
];

function User(){
  //get all users.
	this.getall = function(res){
		//Fake database call to fetch all users.
    res.json(users);
	};

  //get a single user.
  this.getOne = function(id, res){
    var result = {};

		//Fake database call to fetch all users.
    for(x = 0; x < users.size; x++){
      if(users[x].id == id){
        result = users[x];
      }
    }

    res.json(result);

	};
}

module.exports = new User();
