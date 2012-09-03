function UserWindow(title, containingTab, user_id){

  var styles = require('modules/styles/styles');
  var userStyles = require('modules/styles/user');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var userScroll = Titanium.UI.createScrollView(userStyles.userScroll);
  var wrapper = Ti.UI.createView(userStyles.wrapper);
  var url = "http://www.gwahir.com:3000/api/user/" + user_id + ".json";

  var xhr =  Ti.Network.createHTTPClient({
    onload: function(){
      var user = JSON.parse(this.responseText);

    	var image = Ti.UI.createImageView(userStyles.image);
      image.image = user.thumbnail_url;
      wrapper.add(image);

      image.addEventListener('click', function(e){
        var imageObj = require('modules/pages/image');
        var imageWindow = new imageObj(containingTab, user.image_url);
        containingTab.open(imageWindow);
      });

      var name = Ti.UI.createLabel(userStyles.name);
      name.text = (user.first_name + " " + user.last_name);
      wrapper.add(name);

    	var profile = Ti.UI.createLabel(userStyles.profile);
      profile.text = (user.profile ? user.profile : 'No profile information available.');
    	wrapper.add(profile);

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

  return(self);
}

module.exports = UserWindow;