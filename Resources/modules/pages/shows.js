function ShowsWindow(){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var showStyles = require('modules/styles/shows');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var searchObj = require('modules/models/search');
  var Icon = require('modules/models/icons');
  var icons = [];
  var top = 0;
  var left = 26;
  var container = Ti.UI.createView(showStyles.container);

  self.load = function(){

    var projects = new Icon('Browse Shows', 'http://stagey-mobile.s3.amazonaws.com/icon_browse.png', 'cats', null, false, null, 'browse');
    icons.push(projects);

    var whats_next = new Icon('Upcoming', 'http://stagey-mobile.s3.amazonaws.com/icon_next.png', 'performances', null, false, null, 'next');
    icons.push(whats_next);

    var nearby = new Icon('Playing Nearby', 'http://stagey-mobile.s3.amazonaws.com/icon_nearby.png', 'performances', null, false, null, 'nearby');
    icons.push(nearby);

    var reviews = new Icon('Recent Reviews', 'http://stagey-mobile.s3.amazonaws.com/icon_reviews.png', 'reviews', null, false, null, 'reviews');
    icons.push(reviews);

    var iconsView = Ti.UI.createView(showStyles.iconsView);
    iconsView.height = 340;

    if(Ti.Platform.name == 'iPhone OS'){iconsView.top = 80}else{iconsView.top = 80;};

    var venues = new Icon('Venues', 'http://stagey-mobile.s3.amazonaws.com/icon_venues.png', 'venues', null, false, null, 'nearby');
    icons.push(venues);

    var news = new Icon('News', 'http://stagey-mobile.s3.amazonaws.com/icon_news.png', 'feed', null, false, null, 'feed');
    icons.push(news);

    for(var i = 0;i < icons.length; i++){
      if(i > 0 && i % 2 === 0){left = 26;top += 120;}

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

      left += 146;

      iconView.addEventListener('click', function(e){
        runIconEvent(e);
      });
    }

    container.add(iconsView);

    var alertObj = require('modules/models/alert');

    new alertObj(function(alertObj){
      alertView = Ti.UI.createView(showStyles.alertView);

      alertLabel = Ti.UI.createLabel(showStyles.alertLabel);
      alertLabel.text = alertObj.text;
      alertLabel.url = alertObj.link;
      alertView.add(alertLabel);

      var carrotImage = Ti.UI.createImageView(showStyles.carrotImage);
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      alertView.add(carrotImage);

      container.add(alertView);

      alertView.addEventListener('click', function(e){
       Ti.Platform.openURL(e.source.url);
      })

    });

    function loadResults(projects){
      app.openWindow(self, 'Search Results', 'projects', [null, projects]);
    }

    function runIconEvent(e, islongclick){
      var thirdParam, fourthParam;
      if(e.source.icon.id == 'next'){
        thirdParam = 'next';
        fourthParam = 1;
      }
      if(e.source.icon.id == 'nearby'){thirdParam = 'nearby';}
      app.openWindow(self, e.source.icon.text, e.source.icon.window, [thirdParam, fourthParam]);
    }
  }

  self.add(container);

  return(self);
}

module.exports = ShowsWindow;