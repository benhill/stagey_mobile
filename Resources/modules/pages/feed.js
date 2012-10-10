function FeedWindow(title, containingTab) {
  
  var styles = require('modules/styles/styles') 
  var feedStyles = require('modules/styles/feed')  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var rows_per_page = 9
  var tableData = [];

  var feedObj = require('modules/models/feed');
  new feedObj(function(feed_items){
    var table = Titanium.UI.createTableView();

    for(i = 0; i < feed_items.length; i++){
      var feed_item = feed_items[i]

      var row = Ti.UI.createTableViewRow(feedStyles.row);
      row.feed_item = feed_item;
        
      var feedThumb = Titanium.UI.createImageView(feedStyles.feedThumb);  
      feedThumb.image = feed_item.thumbnail_path;
      feedThumb.feed_item = feed_item;
      row.add(feedThumb);

      var textLabel = Ti.UI.createLabel(feedStyles.textLabel);
      textLabel.text = feed_item.text;
      textLabel.feed_item = feed_item;
      row.add(textLabel);

      tableData.push(row);

      row.addEventListener('click', function(e){        
        loadWindow(e);
      });
    }

    table.setData(tableData);
    self.add(table);

    spinner.hide();
  });

  function loadWindow(e){    
    feed_item = e.source.feed_item;

    if(feed_item.object_type == "Venue"){
      var venueObj = require('modules/pages/venue');
      var window = new venueObj('Venue', containingTab, feed_item.object_id);
    }
    else if(feed_item.object_type == "Review"){
      var reviewObj = require('modules/pages/review');
      var window = new reviewObj('Review', containingTab, feed_item.object_id);
    }
    else if(feed_item.object_type == "Project"){
      var projectObj = require('modules/pages/project');
      var window = new projectObj('Project', containingTab, feed_item.object_id);
      window.layout = 'vertical';
    }

    containingTab.open(window);
    window.load();
  }

  spinner.show();
  self.add(spinner);
  
  return self;
}

module.exports = FeedWindow;