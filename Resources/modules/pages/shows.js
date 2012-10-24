function ShowsWindow(){

  var styles = require('modules/styles/styles');
  var showStyles = require('modules/styles/shows');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var searchObj = require('modules/models/search');
  var Icon = require('modules/models/icons');
  var icons = [];
  var top = 0;
  var left = 20;

  self.load = function(){

    var projects = new Icon('Browse Current\nShows', 'iphone/all_shows_48.png', 'cats', null, false, null, 'browse');
    icons.push(projects);

    var whats_next = new Icon('Upcoming\nPerformances', 'iphone/whats_next_48.png', 'performances', null, false, null, 'next');
    icons.push(whats_next);

    var nearby = new Icon('Playing\nNearby', 'iphone/nearby_48.png', 'performances', null, false, null, 'nearby');
    icons.push(nearby);

    var reviews = new Icon('Recent\nReviews', 'iphone/reviews_48.png', 'reviews', null, false, null, 'reviews');
    icons.push(reviews);

    var searchView = Ti.UI.createView(showStyles.searchView);

    var searchField = Titanium.UI.createTextField(showStyles.searchField);
    app.addKeyboardToolbar(searchField);
    searchView.add(searchField);

    var searchButton =  Ti.UI.createImageView(showStyles.searchButton);
    searchView.add(searchButton);

    self.add(searchView);

    var iconsView = Ti.UI.createView(showStyles.iconsView);

    for(var i = 0;i < icons.length; i++){
      if(i > 0 && i % 2 === 0){left = 20;top += 120;}
      
      icon = icons[i];
      
      var iconView = Ti.UI.createView(showStyles.iconView);
      iconView.left = left;
      iconView.top = top;
      iconView.icon = icon;
      
      var iconImage = Ti.UI.createImageView(showStyles.iconImage);    
      iconImage.icon = icon;
      iconImage.image = icon.image;
      iconView.add(iconImage);

      var iconText = Ti.UI.createLabel(showStyles.iconText);
      iconText.text = icon.text;
      iconText.icon = icon;
      iconView.add(iconText);  
      
      iconsView.add(iconView);

      left += 140;  

      iconView.addEventListener('click', function(e){
        runIconEvent(e);
      });  
    }
    
    self.add(iconsView);

    alertView = Ti.UI.createView(showStyles.alertView);

    alertLabel = Ti.UI.createLabel(showStyles.alertLabel);
    alertLabel.text = "Registration is now open for HFF12!"
    alertView.add(alertLabel);

    self.add(alertView);

    searchButton.addEventListener('click', function(e){
      runSearch(searchField.value);
    });

    searchField.addEventListener('return', function(e){
      runSearch(searchField.value);
    });

    function runSearch(terms, e, islongclick){
      new searchObj(terms, function(data){
        loadResults(data);
      });
    }

    function loadResults(projects){
      app.openWindow('Search Results', 'projects', [null, projects]);
    }

    function runIconEvent(e, islongclick){
      var thirdParam, fourthParam;
      if(e.source.icon.id == 'next'){
        thirdParam = 'next';
        fourthParam = 1;
      }
      if(e.source.icon.id == 'nearby'){thirdParam = 'nearby';}
      app.openWindow(e.source.icon.text, e.source.icon.window, [thirdParam, fourthParam]);
    }
  }
  
  return(self);
}

module.exports = ShowsWindow;