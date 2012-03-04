var nowWin = Titanium.UI.currentWindow;

var nowTab = Titanium.UI.currentTab;

var nowTitle = Titanium.UI.createLabel({
  text:'Now Playing: Your lunch.',
  height:'auto',
  width:'auto',            
  top:10,  
  left:5,
  font:{fontSize:14}      
});

nowWin.add(nowTitle);