function ApplicationTabGroup(windows) {

  var ApplicationTabGroup = require('modules/common/tab_group');

  var self = Ti.UI.createTabGroup();

  var homeObj = require('modules/pages/home');  
  var homeTab = Ti.UI.createTab({
    title:'Home',
    icon:'iphone/home_30.png'
  });
  var homeWin = new homeObj('Home', homeTab);
  homeTab.window = homeWin;
  self.addTab(homeTab);

  var mapObj = require('modules/pages/map');  
  var mapTab = Ti.UI.createTab({
    title:'Map',
    icon:'iphone/nearby_30.png'
  });
  var mapWin = new mapObj('Map', mapTab, null);
  mapTab.window = mapWin;
  self.addTab(mapTab);

  var projectsObj = require('modules/pages/projects')  
  var projectsTab = Ti.UI.createTab({
    title:'Projects',
    icon:'iphone/favorites_30.png'
  });
  var projectsWin = new projectsObj('Projects', projectsTab, null);
  projectsTab.window = projectsWin;
  self.addTab(projectsTab);
  projectsWin.load();

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