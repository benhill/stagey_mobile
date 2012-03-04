var mapWin = Titanium.UI.currentWindow;

var mapTab = Titanium.UI.currentTab;

var mapTitle = Titanium.UI.createLabel({
  text:'Fringe Maps',
  height:'auto',
  width:'auto',            
  top:10,  
  left:5,
  font:{fontSize:14}      
});

mapWin.add(mapTitle);