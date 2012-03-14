Ti.UI.backgroundColor = '#dddddd';
 
var tabGroup = Titanium.UI.createTabGroup(); 

 var titleButton =  Ti.UI.createButton({
    title:'search',
    style:Ti.UI.iPhone.SystemButtonStyle.BORDERED,
    height:40,
    width: 40
});

 titleButton.addEventListener('click', function(){   
    var searchWin = Ti.UI.createWindow({url:'search.js', layout:'vertical'});    
    searchWin.open({modal:true, navBarHidden:true});
});

var nowWin = Titanium.UI.createWindow({
  title:'Now Playing',
  backgroundColor:'#fff',
  url:'now.js',
  layout:'vertical',
  rightNavButton: titleButton
});

var nowTab = Titanium.UI.createTab({
  icon:'venuesTabicon.png',
  title:'Now Playing',
  window:nowWin
});
  
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


tabGroup.addTab(nowTab);
tabGroup.addTab(projectsTab);
tabGroup.addTab(venuesTab);
tabGroup.addTab(mapTab);
tabGroup.open();