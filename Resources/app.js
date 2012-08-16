Ti.UI.backgroundColor = '#dddddd';
var tabGroup = Titanium.UI.createTabGroup(); 
var homeWin = Titanium.UI.createWindow({
  title:'Home',
  backgroundColor:'#fff',
  url:'home.js',
  layout:'vertical'
});
var homeTab = Titanium.UI.createTab({
  icon:'icons/home_30.png',
  title:'Home',
  window:homeWin
});
tabGroup.addTab(homeTab);
var projectsWin = Ti.UI.createWindow({
  title:'Projects',
  backgroundColor:'#fff',
  url:'projects.js'
});
var projectsTab = Titanium.UI.createTab({
  icon:'icons/all_shows_30.png',
  title:'Projects',
  window:projectsWin
});
tabGroup.addTab(projectsTab);
var nearbyWin = Titanium.UI.createWindow({
  title:'Nearby',
  backgroundColor:'#fff',
  url:'map.js'
});
var nearbyTab = Titanium.UI.createTab({
  icon:'icons/nearby_30.png',
  title:'Nearby',
  window:nearbyWin
});
tabGroup.addTab(nearbyTab);
var searchWin = Titanium.UI.createWindow({
  title:'Search',
  backgroundColor:'#fff',
  url:'search.js'
});
var searchTab = Titanium.UI.createTab({
  icon:'icons/search_30.png',
  title:'Search',
  window:searchWin
});
tabGroup.addTab(searchTab);
tabGroup.open();