Ti.UI.backgroundColor = '#dddddd';
var tabGroup = Titanium.UI.createTabGroup(); 
var homeWin = Titanium.UI.createWindow({
  title:'Home',
  backgroundColor:'#fff',
  url:'home.js',
  layout:'vertical'
});
var homeTab = Titanium.UI.createTab({
  icon:'homeTabicon.png',
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
  icon:'projectsTabicon.png',
  title:'Projects',
  window:projectsWin
});
tabGroup.addTab(projectsTab);
var venuesWin = Titanium.UI.createWindow({
  title:'Venues',
  backgroundColor:'#fff',
  url:'venues.js'
});
var venuesTab = Titanium.UI.createTab({
  icon:'venuesTabicon.png',
  title:'Venues',
  window:venuesWin
});
tabGroup.addTab(venuesTab);
var mapWin = Titanium.UI.createWindow({
  title:'Fringe Map',
  backgroundColor:'#fff',
  url:'map.js'
});
var mapTab = Titanium.UI.createTab({
  icon:'venuesTabicon.png',
  title:'Map',
  window:mapWin
});
tabGroup.addTab(mapTab);
tabGroup.open();