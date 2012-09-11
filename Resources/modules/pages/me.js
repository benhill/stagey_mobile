function MeWindow(title, containingTab){

  var styles = require('modules/styles/styles');
  var meStyles = require('modules/styles/me');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var currentUser = JSON.parse(Ti.App.Properties.getString('currentUser'));
  var wrapper = Ti.UI.createView(meStyles.wrapper);

  self.load = function(){
    var url = "http://www.gwahir.com:3000/api/user/" + currentUser.id + ".json";

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
        name.text = (currentUser.first_name + " " + currentUser.last_name),
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
        Ti.API.debug("ERROR:  " + e.error);
        alert('There was an error retrieving the remote data. Try again.');
      },
      timeout:5000
    });

    spinner.show();
    self.add(spinner);

    xhr.open("GET", url);
    xhr.send();
  }

  return(self);

  function logout(){
    Ti.App.Properties.setString('currentUser', null);
    Ti.App.currentUser = null
    
    var homeObj = require('modules/pages/home');
    var homeWindow = new homeObj('Home', containingTab);
    containingTab.open(homeWindow);
  }
}

module.exports = MeWindow;