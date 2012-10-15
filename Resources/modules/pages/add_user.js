function AddUserWindow(title, containingTab, return_win){

  var styles = require('modules/styles/styles');
  var addUserStyles = require('modules/styles/add_user');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var addUserObj = require('modules/models/add_user');

  self.load = function(){    

    var emailLabel = Ti.UI.createTextField(addUserStyles.emailLabel);
    self.add(emailLabel);
    app.addKeyboardToolbar(emailLabel);

    var firstNameLabel = Ti.UI.createTextField(addUserStyles.firstNameLabel);
    self.add(firstNameLabel);
    app.addKeyboardToolbar(firstNameLabel);

    var lastNameLabel = Ti.UI.createTextField(addUserStyles.lastNameLabel);
    self.add(lastNameLabel);
    app.addKeyboardToolbar(lastNameLabel);

    var passwordLabel = Ti.UI.createTextField(addUserStyles.passwordLabel);
    self.add(passwordLabel);
    app.addKeyboardToolbar(passwordLabel);
    
    var addUserButton = Ti.UI.createButton(addUserStyles.addUserButton);
    self.add(addUserButton);

    addUserButton.addEventListener('click', function(e){
      runAddUser();
    });

    function runAddUser(){    
      new addUserObj(emailLabel.value, firstNameLabel.value, lastNameLabel.value, passwordLabel.value, function(results){
        addUser(results);
      });
    };

    function addUser(results){
      if(results.error){
        alert(results.error);
      }
      else{
        Ti.App.Properties.setString('currentUser', JSON.stringify(results));
        Ti.App.Properties.setString('userPassword', passwordLabel.value);
        Ti.App.currentUser = results;
        Ti.App.userPassword = passwordLabel.value;

        if(return_win){
          app.openFromWindow(return_win, containingTab);
        }
        else{
          params = ['Me', containingTab];
          app.openWindow('home', containingTab, params);
        }
      }
    };
  }

  return(self);
}

module.exports = AddUserWindow;