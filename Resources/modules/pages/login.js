function LoginWindow(title, containingTab, return_win){

  var styles = require('modules/styles/styles');
  var loginStyles = require('modules/styles/login');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;

  self.load = function(){

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
      params = ['Create an Account', containingTab, return_win];
      app.openWindow('add_user', containingTab, params);
    });

    function loginUser(){
      var url = app.api_url + "login?email=" + email.value + "&password=" + password.value;
      xhr.open("GET", url);
      xhr.send();
    }

    var xhr = Ti.Network.createHTTPClient({
      onload: function(){
        user = JSON.parse(this.responseText)

        if(user.error){
          alert(user.error);
        }
        else{
          Ti.App.Properties.setString('currentUser', JSON.stringify(user));
          Ti.App.Properties.setString('userPassword', password.value);
          Ti.App.currentUser = user;
          Ti.App.userPassword = password.value;

          if(return_win){
            app.openFromWindow(return_win, containingTab);
          }
          else{
            var params = ['Me', containingTab];
            app.openWindow('me', containingTab, params);
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
  }

  return(self);
}

module.exports = LoginWindow;