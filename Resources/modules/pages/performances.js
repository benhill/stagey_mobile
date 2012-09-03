function PerformancesWindow(title, containingTab, project){

  var styles = require('modules/styles/styles');
  var nowStyles = require('modules/styles/now');
  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
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

  self.add(perfsTable);
  self.open();

  return self;
}

module.exports = PerformancesWindow;