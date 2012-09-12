function HomeWindow(title, containingTab){

  var styles = require('modules/styles/styles');
  var homeStyles = require('modules/styles/home');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var searchObj = require('modules/models/search');
  var Icon = require('modules/models/icons');
  var icons = [];
  var top = 0;
  var left = 0;

  var projects = new Icon('Browse', 'iphone/all_shows_48.png', 'cats', null, false);
  icons.push(projects);

  var whats_next = new Icon('Upcoming', 'iphone/whats_next_48.png', 'performances', null, false);
  icons.push(whats_next);

  var nearby = new Icon('Nearby', 'iphone/nearby_48.png', 'map', null, false);
  icons.push(nearby);

  var venues = new Icon('Venues', 'iphone/venues_48.png', 'venues', null, false);
  icons.push(venues);

  var reviews = new Icon('Reviews', 'iphone/reviews_48.png', 'reviews_all', null, false);
  icons.push(reviews);

  var favorites = new Icon('Favorites', 'iphone/favorites_48.png', 'projects', null, true);
  icons.push(favorites);

  var schedule = new Icon('My Schedule', 'iphone/schedule_48.png', 'performances', null, true);
  icons.push(schedule);

  var purchases = new Icon('Purchases', 'iphone/purchase_48.png', 'purchases', null, true);
  icons.push(purchases);

  var profile = new Icon('Me', 'iphone/my_account_48.png', 'me', null, true);
  icons.push(profile);

  var searchView = Ti.UI.createView(homeStyles.searchView);

  var searchField = Titanium.UI.createTextField(homeStyles.searchField);

  addKeyboardToolbar(searchField);

  searchView.add(searchField);

  var searchButton =  Ti.UI.createImageView(homeStyles.searchButton);

  searchView.add(searchButton);

  var iconsView = Ti.UI.createView(homeStyles.iconsView);

  for(var i = 0;i < icons.length; i++){
    if(i > 0 && i % 3 === 0){left = 0;top += 85;}
    
    icon = icons[i];
    
    var iconView = Ti.UI.createView(homeStyles.iconView);
    iconView.left = left;
    iconView.top = top;
    iconView.icon = icon;
    
    var iconImage = Ti.UI.createImageView(homeStyles.iconImage);    
    iconImage.icon = icon;
    iconImage.image = icon.image;
    iconView.add(iconImage);

    var iconText = Ti.UI.createLabel(homeStyles.iconText);
    iconText.text = icon.text;
    iconText.icon = icon;
    iconView.add(iconText);  
    
    iconsView.add(iconView);

    left += 100;  

    iconView.addEventListener('click', function(e){
      runIconEvent(e);
    });  
  }

  self.add(searchView);
  self.add(iconsView);  

  searchButton.addEventListener('click', function(e){
    runSearch(searchField.value);
  });

  searchField.addEventListener('return', function(e){
    runSearch(searchField.value);
  });

  function addKeyboardToolbar(textbox){
    var flexSpace = Ti.UI.createButton({
      systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
      right:0
    });

    var doneButton = Ti.UI.createButton({
      systemButton:Ti.UI.iPhone.SystemButton.DONE,
      right:0
    });

    textbox.keyboardToolbar = [flexSpace, doneButton];

    textbox.addEventListener('focus', function(e) {
      textbox.keyboardToolbar = [flexSpace, doneButton];
      doneButton.activeFld = textbox;
    });

    doneButton.addEventListener('click', function(e) {
      e.source.activeFld.blur();
    });
  };

  function runSearch(terms, e, islongclick){
    new searchObj(terms, function(data){
      loadResults(data);
    });
  }

  function loadResults(projects){
    var resultsObj = require('modules/pages/projects');
    var resultsWindow = new resultsObj('Search Results', containingTab, null, projects);
    containingTab.open(resultsWindow);
    resultsWindow.load();
  }

  function runIconEvent(e, islongclick){
    user = JSON.parse(Ti.App.Properties.getString('currentUser'));

    var windowObj = require('modules/pages/' + e.source.icon.window);
    var thirdParam;
    if(e.source.icon.text == 'Favorites'){thirdParam = 'favorites';}
    if(e.source.icon.text == 'Upcoming'){thirdParam = 'next';}
    if(e.source.icon.text == 'My Schedule'){thirdParam = 'schedule';}

    var newWindow = new windowObj(e.source.icon.text, containingTab, thirdParam);

  	if(user || e.source.icon.auth_required == false){
      containingTab.open(newWindow);
      newWindow.load();
    }
    else{
      var loginObj = require('modules/pages/login');
      var loginWindow = new loginObj('Login', containingTab, newWindow);
      containingTab.open(loginWindow);
    }
  }

  return(self);
}

module.exports = HomeWindow;