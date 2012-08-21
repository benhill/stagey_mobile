Ti.include("helper.js");
Ti.UI.backgroundColor = '#dddddd';
var tabGroup = Titanium.UI.createTabGroup(); 
var homeWin = Titanium.UI.createWindow({
  title:'Home',
  backgroundColor:'#fff',
  url:'home.js',
  layout:'vertical',
  barColor:barColor
});
var homeTab = Titanium.UI.createTab({
  icon:'icons/home_30.png',
  title:'Home',
  window:homeWin
});
tabGroup.addTab(homeTab);
var nearbyWin = Titanium.UI.createWindow({
  title:'Nearby',
  backgroundColor:'#fff',
  url:'map.js',
  barColor:barColor
});
var nearbyTab = Titanium.UI.createTab({
  icon:'icons/nearby_30.png',
  title:'Nearby',
  window:nearbyWin
});
tabGroup.addTab(nearbyTab);
var favoritesWin = Ti.UI.createWindow({
  title:'Favorites',
  backgroundColor:'#fff',
  url:'projects.js',
  barColor:barColor
});
var favoritesTab = Titanium.UI.createTab({
  icon:'icons/favorites_30.png',
  title:'Favorites',
  window:favoritesWin
});
tabGroup.addTab(favoritesTab);
var searchWin = Titanium.UI.createWindow({
  title:'Search',
  backgroundColor:'#fff',
  url:'search.js',
  barColor:barColor
});
var searchTab = Titanium.UI.createTab({
  icon:'icons/search_30.png',
  title:'Search',
  window:searchWin
});
tabGroup.addTab(searchTab);
tabGroup.open();