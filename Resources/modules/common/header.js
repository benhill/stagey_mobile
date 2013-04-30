function Header(title, window){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var headerStyles = require('modules/styles/header');
  var headerView = Ti.UI.createView(headerStyles.headerView);
  var navView = Ti.UI.createView(headerStyles.navView);
  var menuButtonView = Ti.UI.createView(headerStyles.menuButtonView);

  if(Ti.Platform.name == 'iPhone OS'){

    menuButtonView.toggle = false;
    headerView.add(menuButtonView);

    if(Ti.App.currentUser == null){
      loadUser();
    }
    else{
      loadUser(Ti.App.currentUser);
    }

    navView.addEventListener('swipe', function(e) {
      if (e.direction == 'right'){closeNav();};
    });

    window.add(navView);

    menuButtonView.addEventListener('click', function(e){
      loadMenu(e);
    });

    function loadMenu(e){
      if(e.source.toggle == true){
        closeNav();
      }
      else{
        navView.animate({
          right:0,
          duration:400,
          curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        e.source.toggle = true;
      }
    }

    function closeNav(){
      navView.animate({
        right:-200,
        duration:400,
        curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
      });
      menuButtonView.toggle = false;
    }
  }

  if(window && title != 'Home' && Ti.Platform.name == 'iPhone OS'){

    var backButton =  Ti.UI.createLabel(headerStyles.backButton);
    headerView.add(backButton);

    backButton.addEventListener('click', function(e){
      if(title == 'Schedule' || title == 'Me'){
        app.openWindow(window, 'Home', 'shows', []);
      }
      else if (title == 'My Schedule'){
        app.openWindow(window, 'Me', 'me', []);
      }
      else{
        window.close();
      }
    })
  }
  else{
    var logoImage =  Ti.UI.createImageView(headerStyles.logoImage);
    logoImage.image = 'http://stagey-mobile.s3.amazonaws.com/hff_logo.png';
    headerView.add(logoImage);

    if(Ti.Platform.name != 'iPhone OS' && title != "Home"){
      logoImage.addEventListener('click', function(e){
        app.openWindow(window, 'Home', 'shows', []);
      })
    }
  }

	return headerView;

  function loadUser(user){
    var wrapper = Ti.UI.createView(headerStyles.wrapper);
    var icons = [];
    var tableData = [];
    var table = Ti.UI.createTableView(headerStyles.table);

    var iconObj = require('modules/models/icons');

    var home = new iconObj('HOME', 'https://stagey-mobile.s3.amazonaws.com/home_24.png', 'shows', null, false, 'Home', 'Home');
    icons.push(home);

    var search = new iconObj('SEARCH', 'https://stagey-mobile.s3.amazonaws.com/search_24.png', 'search', null, false);
    icons.push(search);

    if(user){
      var favorites = new iconObj('FAVORITES', 'https://stagey-mobile.s3.amazonaws.com/favorite_24.png', 'projects', null, false, 'favorites', 'favorites');
      icons.push(favorites);

      var schedule = new iconObj('SCHEDULE', 'https://stagey-mobile.s3.amazonaws.com/schedule_24.png', 'performances', null, false, 'schedule', 'schedule');
      icons.push(schedule);

      var projects = new iconObj('MY SHOWS', 'https://stagey-mobile.s3.amazonaws.com/projects_24.png', 'projects', null, false, 'projects', 'my_projects');
      icons.push(projects);

      var reviews = new iconObj('MY REVIEWS', 'https://stagey-mobile.s3.amazonaws.com/reviews_24.png', 'reviews', null, false, Ti.App.currentUser.id);
      icons.push(reviews);

      var profile = new iconObj('PROFILE', 'https://stagey-mobile.s3.amazonaws.com/profile_24.png', 'user', null, false, user.id, 'user');
      icons.push(profile);
    }

    for(i=0; i< icons.length; i++){

      var icon = icons[i];

      var row = Ti.UI.createTableViewRow(headerStyles.row);
      row.icon = icon;

      var iconImage = Ti.UI.createImageView(headerStyles.iconImage);
      iconImage.image = icon.image;
      row.add(iconImage);

      var iconLabel = Ti.UI.createLabel(headerStyles.iconLabel);
      iconLabel.text = icon.text;
      iconLabel.icon = icon;
      row.add(iconLabel);

      var carrotImage = Ti.UI.createImageView(headerStyles.carrotImage);
      carrotImage.icon = icon;
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      row.add(carrotImage);

      row.addEventListener('click', function(e){
        icon = e.source.icon;
        navView.right = -200;
        menuButtonView.toggle = false;
        navView
        if(e.source.icon.id == 'schedule'){
          app.openWindow(window, e.source.icon.text, icon.window, [icon.third_param, 1, "My Schedule"]);
        }
        else if(e.source.icon.id == 'my_projects'){
          app.openWindow(window, e.source.icon.text, icon.window, [null, null, null, null, user.id]);
        }
        else if(e.source.icon.id == 'Home'){
          app.openWindow(window, 'Home', icon.window, [null, null, null, null, user.id]);
        }
        else{
          app.openWindow(window, e.source.icon.text, icon.window, [icon.third_param]);
        }
      });

      tableData.push(row);
    }

    table.setData(tableData);
    wrapper.add(table);

    if(user){
      var logoutButton = Ti.UI.createButton(headerStyles.logoutButton);
      wrapper.add(logoutButton);

      logoutButton.addEventListener('click', function(e){
        logout();
      })
    }
    else{
      var loginButton = Ti.UI.createButton(headerStyles.loginButton);
      wrapper.add(loginButton);

      loginButton.addEventListener('click', function(e){
        app.openWindow(window, 'Login', 'login', []);
      });
    }

    navView.add(wrapper);
  }

  function logout(){
    Ti.App.Properties.setString('currentUser', null);
    Ti.App.currentUser = null
    app.openWindow(window, 'Home', 'shows', []);
  }
}

module.exports = Header;