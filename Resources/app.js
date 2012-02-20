var win = Ti.UI.createWindow();
 
var l = Ti.UI.createLabel({
    text:'Hello World.  I am the Fringe App.', 
    color:'#888',
    font:{fontSize:20},
    height:'auto',
    width:'auto',
});
win.open();
win.add(l);