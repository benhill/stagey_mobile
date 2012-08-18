Ti.include("helper.js");
var perfsWin = Ti.UI.currentWindow;
var projectsTab = Ti.UI.currentTab;
var project = perfsWin.object;
var perfsTable = Ti.UI.createTableView();
var perfData = [];
var performances = Ti.UI.createView({
  top:5,
  layout:'vertical'
});
var last_space;
for(var i = 0; i < project.performances.length; i++) {
  var perfRow = Ti.UI.createTableViewRow({
    height:'60dp'
  });
  var performance = project.performances[i];
  var perfInfoLabel = Ti.UI.createLabel({
    text:performance.date + " @" + performance.time + " \u00B7 " + performance.cost + " \u00B7 " + performance.duration, 
    font:{fontSize:14, fontWeight:'bold'},
    height:'auto',
    width:'95%',
    top:5,
    left:5
  });
  perfRow.add(perfInfoLabel);
  var spaceLabel = Ti.UI.createLabel({
    text:performance.venue + " (" + performance.space + ")",
    font:{fontSize:10},
    height:'auto',
    width: 'auto',
    top:25,
    left:5
  });
  perfRow.add(spaceLabel);
  var venueAddress = Ti.UI.createLabel({
    text:performance.venue_address,
    top:40,    
    left:5,
    font:{fontSize:9},
    height:'auto',
    width: 'auto'
  });      
  perfRow.add(venueAddress);
  perfData.push(perfRow);
}
perfsTable.setData(perfData);
perfsWin.add(perfsTable);
perfsWin.open();