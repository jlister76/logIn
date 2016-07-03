module.exports = function(app){

  var User = app.models.User;
  var Role = app.models.Role;
  var Employee = app.models.Employee;
  var RoleMapping = app.models.RoleMapping;


  User.create([
    {username: 'John', email: 'john@email.com', password: "01234HCI"},
    {username: 'IT', email: 'it@email.com', password: "01234HCI"}
  ], function(err, users){
    if (err) return console.error('%j', err);

    Role.create({
      name:'admin'
    }, function (err,role){
      if (err) return console.error(err);
      console.info(role);

      //Make IT and admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function(err, principal){
        if (err) return debug(err);
        console.error(principal);
      });
    });
  });
};


