function ApplicationTabGroup(windows) {

  var ApplicationTabGroup = require('modules/common/tab_group');

  var self = Ti.UI.createTabGroup();

  var showsObj = require('modules/pages/home');  
  var showsTab = Ti.UI.createTab({
    title:'Shows',
    icon:'iphone/home_30.png'
  });
  var showsWin = new showsObj('Home', showsTab);
  showsTab.window = showsWin;
  self.addTab(showsTab);

  var venuesObj = require('modules/pages/venues')
  var venuesTab = Ti.UI.createTab({
    title:'Venues',
    icon:'iphone/favorites_30.png'
  });
  var venuesWin = new venuesObj('Venues', venuesTab);
  venuesTab.window = venuesWin;
  self.addTab(venuesTab);
  venuesWin.load();

  var newsObj = require('modules/pages/feed');  
  var newsTab = Ti.UI.createTab({
    title:'News',
    icon:'iphone/nearby_30.png'
  });
  var newsWin = new newsObj('Map', newsTab);
  newsTab.window = newsWin;
  self.addTab(newsTab);

  var meObj = require('modules/pages/me')  
  var meTab = Ti.UI.createTab({
    title:'Me',
    icon:'iphone/favorites_30.png'
  });
  var meWin = new meObj('Me', meTab);
  meTab.window = meWin;
  self.addTab(meTab);
  meWin.load();  

  meTab.addEventListener('focus',function(e){
  	loadMeWindow();
  })

  function loadMeWindow(){
    var meObj = require('modules/pages/me');
    var meWindow = new meObj('Me', meTab);
    meTab.open(meWindow);
    meWindow.load();
  }

  var searchObj = require('modules/pages/search')  
  var searchTab = Ti.UI.createTab({
    title:'Search',
    icon:'iphone/search_30.png'
  });
  var searchWin = new searchObj('Search', searchTab, null);
  searchTab.window = searchWin;
  self.addTab(searchTab);

  return self;
};

module.exports = ApplicationTabGroup;