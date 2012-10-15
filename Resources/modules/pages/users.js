function UsersWindow(title, containingTab, users){

  var styles = require('modules/styles/styles');
  var usersStyles = require('modules/styles/users');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var usersTable = Ti.UI.createTableView(usersStyles.table);
  var usersData = [];

  self.load = function(){

    for(i = 0; i < users.length; i++){

      user = users[i];

      var row = Ti.UI.createTableViewRow(usersStyles.row);
      row.link = 'user.js';
      row.user = user;

      var image = Ti.UI.createImageView(usersStyles.image);
      image.image = user.image_url;
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

      usersData.push(row);
    }

    usersTable.setData(usersData);
    self.add(usersTable);

    self.remove(spinner);

    usersTable.addEventListener('click', function(e){  
      loadUser(e);
    });

    function loadUser(e, islongclick) { 
      params = ['User', containingTab, e.source.user.id];
      app.openWindow('user', containingTab, params);
    }
  }

  return(self);
}

module.exports = UsersWindow;