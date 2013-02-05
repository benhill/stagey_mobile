function UserWindow(user_id){

  var app = require('modules/core');
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

        var nameView = Ti.UI.createView(userStyles.nameView);

      	var image = Ti.UI.createImageView(userStyles.image);
        image.image = user.thumbnail_url;
        nameView.add(image);

        image.addEventListener('click', function(e){
          app.openWindow('Image', 'image', [user.image_url]);
        });

        var name = Ti.UI.createLabel(userStyles.name);
        name.text = (user.first_name + " " + user.last_name);
        nameView.add(name);

        self.add(nameView);

        var icons = [];
        var tableData = [];
        var table = Ti.UI.createTableView(userStyles.table);

        var iconObj = require('modules/models/icons');

        var reviews = new iconObj('Reviews by ' + user.first_name, '', 'reviews', null, false, user.id);
        icons.push(reviews);

        var projects = new iconObj('Projects by ' + user.first_name, '', 'projects', null, false, 'favorites');
        icons.push(projects);

        for(i=0; i< icons.length; i++){

          var icon = icons[i];

          var row = Ti.UI.createTableViewRow(userStyles.row);
          row.icon = icon;

          var iconLabel = Ti.UI.createLabel(userStyles.iconLabel);
          iconLabel.text = icon.text;
          iconLabel.icon = icon;
          row.add(iconLabel);

          var carrotImage = Ti.UI.createImageView(userStyles.carrotImage);
          carrotImage.icon = icon;
          carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
          row.add(carrotImage);

          row.addEventListener('click', function(e){
            icon = e.source.icon;
            if(e.source.icon.window == 'reviews'){
              app.openWindow(e.source.icon.text, icon.window, [user.id, 1]);
            }
            else if(e.source.icon.window == 'projects'){
              app.openWindow(e.source.icon.text, icon.window, [null, null, null, null, user.id]);
            }
          });

          tableData.push(row);
        }

        table.setData(tableData);
        self.add(table);

        
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
  }

  return(self);
}

module.exports = UserWindow;