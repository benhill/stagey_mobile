function UserWindow(user_id){

  var styles = require('modules/styles/styles');
  var userStyles = require('modules/styles/user');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var userScroll = Titanium.UI.createScrollView(userStyles.userScroll);
  var wrapper = Ti.UI.createView(userStyles.wrapper);
  var url = app.api_url + "user/" + user_id;

  self.load = function(){

    var xhr =  Ti.Network.createHTTPClient({
      onload: function(){
        var user = JSON.parse(this.responseText);

      	var image = Ti.UI.createImageView(userStyles.image);
        image.image = user.thumbnail_url;
        wrapper.add(image);

        image.addEventListener('click', function(e){
          app.openWindow('Image', 'image', [user.image_url]);
        });

        var name = Ti.UI.createLabel(userStyles.name);
        name.text = (user.first_name + " " + user.last_name);
        wrapper.add(name);

      	var profile = Ti.UI.createLabel(userStyles.profile);
        profile.text = (user.profile ? user.profile : 'No profile information available.');
      	wrapper.add(profile);
        
        var line = Ti.UI.createView(userStyles.line1);
        wrapper.add(line);

        var reviewsLabel = Ti.UI.createLabel(userStyles.reviewsLabel);
        reviewsLabel.text = "Reviews by " + user.first_name;
        wrapper.add(reviewsLabel);

        reviewsLabel.addEventListener('click', function(e){
          app.openWindow('Reviews by ' + user.first_name, 'reviews', [user.id, null]);
        });

        var line = Ti.UI.createView(userStyles.line2);
        wrapper.add(line);

      	userScroll.add(wrapper);

        self.add(userScroll);

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

    xhr.open("GET", url);
    xhr.send();

    self.add(spinner);

    spinner.show();
  }

  return(self);
}

module.exports = UserWindow;