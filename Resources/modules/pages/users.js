function UsersWindow(project_id){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var usersStyles = require('modules/styles/users');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var usersTable = Ti.UI.createTableView(usersStyles.table);
  var usersData = [];

  self.load = function(){

    spinner.show();
    self.add(spinner);

    users = [];

    var usersObj = require('modules/models/users');
    new usersObj(project_id, function(users){
                  
      for(i = 0; i < users.length; i++){

        user = users[i];

        var row = Ti.UI.createTableViewRow(usersStyles.row);
        row.link = 'user.js';
        row.user = user;

        var image = Ti.UI.createImageView(usersStyles.image);
        image.image = user.thumbnail_url;
        image.user = user; 
        row.add(image);

        var nameLabel = Ti.UI.createLabel(usersStyles.nameLabel);
        nameLabel.text = user.first_name + ' ' + user.last_name;
        nameLabel.user = user; 
        row.add(nameLabel);

        var roleLabel = Ti.UI.createLabel(usersStyles.roleLabel);
        roleLabel.text = user.role;
        roleLabel.user = user;
        row.add(roleLabel);

        var carrotImage = Ti.UI.createImageView(usersStyles.carrotImage);
        carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
        carrotImage.user = user;
        row.add(carrotImage);

        usersData.push(row);
      }

      usersTable.setData(usersData);
      self.add(usersTable);

      self.remove(spinner);

      usersTable.addEventListener('click', function(e){  
        loadUser(e);
      });

      function loadUser(e, islongclick) { 
        app.openWindow(self, 'User', 'user', [e.source.user.id]);
      }
    });
  }

  return(self);
}

module.exports = UsersWindow;