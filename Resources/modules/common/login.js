function LoginWindow(return_win, current_win){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var loginStyles = require('modules/styles/login');
  var self = Ti.UI.createView({
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE,
    top:0
  })

  var email = Ti.UI.createTextField(loginStyles.email);
  self.add(email);
  app.addKeyboardToolbar(email);

  var password = Ti.UI.createTextField(loginStyles.password);
  self.add(password);
  app.addKeyboardToolbar(password);

  password.addEventListener('return', function(e){
    loginUser();
  });

  var loginButton = Ti.UI.createButton(loginStyles.loginButton);
  self.add(loginButton);

  loginButton.addEventListener('click', function(e){
    loginUser();
  });

  var addUserLabel = Ti.UI.createLabel(loginStyles.addUserLabel);
  self.add(addUserLabel);

  addUserLabel.addEventListener('click', function(e){
    app.openWindow(current_win, 'Create an Account', 'add_user', [return_win]);
  });

  function loginUser(){
    var url = Ti.App.secure_api_url + "login";
    xhr.open("POST", url);
    xhr.send({"email": email.value, "password": password.value});
  }

  var xhr = Ti.Network.createHTTPClient({
    onload: function(){
      user = JSON.parse(this.responseText)

      if(user.error){
        alert(user.error);
      }
      else{
        Ti.App.Properties.setString('currentUser', JSON.stringify(user));
        Ti.App.Properties.setString('guid', user.guid);
        Ti.App.Properties.setString('userPassword', password.value);
        Ti.App.currentUser = user;
        Ti.App.fireEvent('app:refreshMeTab', {user:user});

        if(return_win){
          app.openFromWindow(return_win);
        }
        else{
          app.openWindow(self, 'Home', 'shows', []);
        }
      }
    },
    onerror: function(e) {
      Ti.API.debug("STATUS: " + this.status);
      Ti.API.debug("TEXT:   " + this.responseText);
      Ti.API.debug("ERROR:  " + e.error);
      alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
  })

  return(self);

}

module.exports = LoginWindow;