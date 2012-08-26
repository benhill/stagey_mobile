Ti.include("helper.js");
var label = Ti.UI.createLabel({
  text:'hello.',
  height:Titanium.UI.SIZE,
  width:Titanium.UI.SIZE,
  font:{fontSize:14},
  left:10,
  top:50
});
currentWin.add(label);
currentWin.open();