function ApplicationTabGroup(windows) {

  var app = require('modules/core');
  var self = Ti.UI.createTabGroup();  

  self.addEventListener('focus', function(e){
    if(e.tab){Ti.API.activeTab = e.tab;}    
  });
  
  var showsTab = Ti.UI.createTab({
    title:'Shows',
    icon:'iphone/shows_30.png'
  });
  showsTab.window = createWin('Shows', 'shows', showsTab)
  showsTab.window.orientationModes = [Titanium.UI.PORTRAIT]
  self.addTab(showsTab);
  showsTab.window.load();  
  Ti.API.activeTab = showsTab;

  var venuesTab = Ti.UI.createTab({
    title:'Venues',
    icon:'iphone/nearby_30.png'
  });
  venuesTab.window = createWin('Venues', 'venues', venuesTab)
  venuesTab.window.backgroundColor = 'white';
  venuesTab.window.orientationModes = [Titanium.UI.PORTRAIT]
  self.addTab(venuesTab);
  venuesTab.window.load();
  
  var newsTab = Ti.UI.createTab({
    title:'News',
    icon:'iphone/news_30.png'
  });  
  newsTab.window = createWin('News', 'feed', newsTab)
  newsTab.window.orientationModes = [Titanium.UI.PORTRAIT]
  self.addTab(newsTab);
  newsTab.window.load();
  
  var meTab = Ti.UI.createTab({
    title:'Me',
    icon:'iphone/me_30.png'
  });

  meTab.window = createWin('Me', 'me', meTab);    
  meTab.window.orientationModes = [Titanium.UI.PORTRAIT]
  self.addTab(meTab);
  meTab.window.load();
  
  function createWin(title, winName, tab){
    var winObj = require('modules/pages/' + winName)
    win = new winObj();
    win.navBarHidden = true;

    var headerObj = require('modules/common/header');
    win.add(new headerObj(title));

    return win;
  }

  Ti.App.tabGroup = self;

  return self;
};

module.exports = ApplicationTabGroup;