function ApplicationTabGroup(windows) {

  var self = Ti.UI.createTabGroup();
  
  var showsTab = Ti.UI.createTab({
    title:'Shows',
    icon:'iphone/shows_30.png'
  });
  showsTab.window = createWin('Shows', 'shows', showsTab)
  self.addTab(showsTab);
  showsTab.window.load();  

  var venuesTab = Ti.UI.createTab({
    title:'Venues',
    icon:'iphone/nearby_30.png'
  });
  venuesTab.window = createWin('Venues', 'venues', venuesTab)
  self.addTab(venuesTab);
  venuesTab.window.load();
  
  var newsTab = Ti.UI.createTab({
    title:'News',
    icon:'iphone/news_30.png'
  });  
  newsTab.window = createWin('News', 'feed', newsTab)
  self.addTab(newsTab);
  newsTab.window.load();
  
  var meTab = Ti.UI.createTab({
    title:'Me',
    icon:'iphone/me_30.png'
  });
  meTab.window = createWin('Me', 'me', meTab);
  self.addTab(meTab);
  meTab.window.load();

  meTab.addEventListener('focus',function(e){
  	loadMeWindow();
  })

  function loadMeWindow(){
    app.openWindow('Me', 'me', [])
  }
  
  var searchTab = Ti.UI.createTab({
    title:'Search',
    icon:'iphone/search_30.png'
  });
  searchTab.window = createWin('Search', 'search', searchTab);
  self.addTab(searchTab);
  searchTab.window.load();

  self.addEventListener('focus', function(e){    
    Ti.API.activeTab = e.tab;
  });

  function createWin(title, winName, tab){
    var winObj = require('modules/pages/' + winName)
    win = new winObj();
    win.navBarHidden = true;

    var headerObj = require('modules/common/header');
    win.add(new headerObj(title));

    return win;
  }

  return self;
};

module.exports = ApplicationTabGroup;