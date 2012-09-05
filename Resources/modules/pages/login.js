function LoginWindow(title, containingTab){

  var styles = require('modules/styles/styles');
  var loginStyles = require('modules/styles/login');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;

  var email = Ti.UI.createTextField(loginStyles.email);
  self.add(email);

  var password = Ti.UI.createTextField(loginStyles.password);
  self.add(password);

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
    var addUserObj = require('modules/pages/add_user');
    var addUserWindow = new addUserObj('Create an Account', containingTab, self.return_win);
    containingTab.open(addUserWindow);
  });

  function loginUser(){
    var url = "http://www.gwahir.com:3000/api/login.json?email=" + email.value + "&password=" + password.value;
    xhr.open("GET", url);
    xhr.send();
  }

  var xhr = Ti.Network.createHTTPClient({
    onload: function(){
      user = JSON.parse(this.responseText)

      if(user){
        Ti.App.Properties.setString('currentUser', JSON.stringify(user));
        Ti.App.Properties.setString('userPassword', password.value);
        Ti.App.currentUser = user;
        Ti.App.userPassword = password.value;

        if(self.return_win){
          currentTab.open(self.return_win);
        }
        else{
          var homeObj = require('modules/pages/home');
          var homeWindow = new homeObj('Home', containingTab);
          containingTab.open(homeWindow);
        }
      }
      else {
        alert('login failed');
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