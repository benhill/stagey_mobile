function MeWindow(title, containingTab){

  var styles = require('modules/styles/styles');
  var meStyles = require('modules/styles/me');  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var wrapper = Ti.UI.createView(meStyles.wrapper);

  self.load = function(){

    if(Ti.App.currentUser == null){
      var meObj = require('modules/pages/me');
      var meWindow = new meObj('Me', containingTab);

      var loginObj = require('modules/pages/login');
      var loginWindow = new loginObj('Login', containingTab, meWindow);
      containingTab.open(loginWindow);
    }
    else{
      
      var url = app.api_url + "user/" + Ti.App.currentUser.id;

      var xhr =  Ti.Network.createHTTPClient({
        onload: function(){
          
          var user = JSON.parse(this.responseText);

          var image = Ti.UI.createImageView(meStyles.image);
          image.image = user.thumbnail_url;

          image.addEventListener('click', function(e){
            var imageObj = require('modules/pages/image');
            var imageWindow = new imageObj(containingTab, user.image_url);
            containingTab.open(imageWindow);
          });

          wrapper.add(image);   

          var name = Ti.UI.createLabel(meStyles.name);
          name.text = (Ti.App.currentUser.first_name + " " + Ti.App.currentUser.last_name),
          wrapper.add(name);

          var logoutButton = Ti.UI.createButton(meStyles.logoutButton);
          wrapper.add(logoutButton);

          logoutButton.addEventListener('click', function(e){
            logout();
          });

          if(user.review_count > 0){
            var line = Ti.UI.createView(meStyles.line1);
            wrapper.add(line);

            var reviewsLabel = Ti.UI.createLabel(meStyles.reviewsLabel);
            reviewsLabel.text = "Reviews by " + user.first_name;
            wrapper.add(reviewsLabel);

            reviewsLabel.addEventListener('click', function(e){
              var reviewsObj = require('modules/pages/reviews');
              var reviewsWindow = new reviewsObj('Reviews by ' + user.first_name, containingTab, null, user.id);
              containingTab.open(reviewsWindow);
              reviewsWindow.load();
            });

            var line = Ti.UI.createView(meStyles.line2);
            wrapper.add(line);
          }

          self.add(wrapper);

          self.remove(spinner);
        },
        onerror: function(){
          Ti.API.debug("STATUS: " + this.status);
          Ti.API.debug("TEXT:   " + this.responseText);
          Ti.API.debug("ERROR:  " + this.error);
          alert('There was an error retrieving the remote data. Try again.');
        },
        timeout:5000
      });

      spinner.show();
      self.add(spinner);

      xhr.open("GET", url);
      xhr.send();
    }
  }

  return(self);

  function logout(){
    Ti.App.Properties.setString('currentUser', null);
    Ti.App.currentUser = null
    
    var loginObj = require('modules/pages/login');
    var loginWindow = new loginObj('Login', containingTab);
    containingTab.open(loginWindow);
  }
}

module.exports = MeWindow;