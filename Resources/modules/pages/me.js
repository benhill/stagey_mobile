function MeWindow(){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var meStyles = require('modules/styles/me');  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var wrapper = Ti.UI.createView(meStyles.wrapper);  

  Ti.App.addEventListener('app:refreshMeTab', function(data){ 
    clearWrapper();
    loadUser(data.user);
  });

  self.load = function(){

    if(Ti.App.currentUser == null){
      var meObj = require('modules/pages/me');
      var meWindow = new meObj('Me', Ti.API.activeTab);
      meWindow.navBarHidden = true;

      var headerObj = require('modules/common/header');
      meWindow.add(new headerObj());

      loadLogin();
    }
    else{

      var userObj = require('modules/models/user');
      new userObj(Ti.App.currentUser.id, function(user){
        loadUser(user);
      });

      spinner.show();
      self.add(spinner);
    }
  }

  return(self);

  function loadUser(user){    
    
    var image = Ti.UI.createImageView(meStyles.image);
    image.image = user.thumbnail_url;

    image.addEventListener('click', function(e){
      app.openWindow('Image', 'image', [user.image_url])
    });

    wrapper.add(image);   

    var nameLabel = Ti.UI.createLabel(meStyles.nameLabel);
    var name = Ti.App.currentUser.first_name + " " + Ti.App.currentUser.last_name;
    if(name.length >= 20){name = name.substr(0,20) + '...'};
    nameLabel.text = name;
    wrapper.add(nameLabel);

    var icons = [];
    var tableData = [];
    var table = Ti.UI.createTableView(meStyles.table);

    var iconObj = require('modules/models/icons');

    var reviews = new iconObj('My Reviews', 'iphone/all_shows_48.png', 'reviews', null, false, Ti.App.currentUser.id);
    icons.push(reviews);

    var favorites = new iconObj('My Favorites', 'iphone/all_shows_48.png', 'projects', null, false, 'favorites', 'favorites');
    icons.push(favorites);

    var schedule = new iconObj('My Schedule', 'iphone/all_shows_48.png', 'performances', null, false, 'schedule', 'schedule');
    icons.push(schedule);

    var projects = new iconObj('My Projects', '', 'projects', null, false, 'projects', 'my_projects');
    icons.push(projects);

    var profile = new iconObj('My Profile', 'iphone/all_shows_48.png', 'user', null, false, user.id, 'user');
    icons.push(profile);

    for(i=0; i< icons.length; i++){

      var icon = icons[i];

      var row = Ti.UI.createTableViewRow(meStyles.row);
      row.icon = icon;

      var iconLabel = Ti.UI.createLabel(meStyles.iconLabel);
      iconLabel.text = icon.text;
      iconLabel.icon = icon;
      row.add(iconLabel);

      var carrotImage = Ti.UI.createImageView(meStyles.carrotImage);
      carrotImage.icon = icon;
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      row.add(carrotImage);

      row.addEventListener('click', function(e){
        icon = e.source.icon;
        if(e.source.icon.id == 'schedule'){
          app.openWindow(e.source.icon.text, icon.window, [icon.third_param, 1]);
        }        
        else if(e.source.icon.id == 'my_projects'){
          app.openWindow(e.source.icon.text, icon.window, [null, null, null, null, user.id]);
        }
        else{
          app.openWindow(e.source.icon.text, icon.window, [icon.third_param]);
        }
      });

      tableData.push(row);
    }

    table.setData(tableData);
    wrapper.add(table);

    var logoutButton = Ti.UI.createButton(meStyles.logoutButton);
    wrapper.add(logoutButton);

    logoutButton.addEventListener('click', function(e){
      logout();
    });

    self.add(wrapper);

    self.remove(spinner);
  }

  function logout(){
    Ti.App.Properties.setString('currentUser', null);
    Ti.App.currentUser = null
    loadLogin();    
  }

  function clearWrapper(){
    for(i=wrapper.children.length-1; i >= 0 ; i--){
      wrapper.remove(wrapper.children[i]);
    }
  }

  function loadLogin(){
    clearWrapper();
    var loginObj = require('modules/common/login');
    wrapper.add(new loginObj());
    self.add(wrapper);
  }

}

module.exports = MeWindow;