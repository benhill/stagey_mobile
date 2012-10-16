function FeedWindow(){
  
  var styles = require('modules/styles/styles') 
  var feedStyles = require('modules/styles/feed')  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var rows_per_page = 9
  var tableData = [];

  self.load = function(){

    var feedObj = require('modules/models/feed');
    new feedObj(function(feed_items){
      var table = Titanium.UI.createTableView(feedStyles.table);

      for(i = 0; i < feed_items.length; i++){
        var feed_item = feed_items[i]

        var row = Ti.UI.createTableViewRow(feedStyles.row);
        row.feed_item = feed_item;
          
        var feedThumb = Titanium.UI.createImageView(feedStyles.feedThumb);  
        feedThumb.image = feed_item.item_thumbnail_path;
        feedThumb.feed_item = feed_item;
        row.add(feedThumb);

        var objectLabel = Ti.UI.createLabel(feedStyles.objectLabel);      
        objectLabel.text = feed_item.object_name;
        objectLabel.feed_item = feed_item;
        row.add(objectLabel);

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

      if(feed_item.object_type == 'Venue'){
        var win_name = 'venue';
        var title = 'Venue';
      }
      else if(feed_item.object_type == 'Review'){
        var win_name = 'review';
        var title = 'Review';
      }
      else if(feed_item.object_type == 'Project'){
        var win_name = 'project';
        var title = 'Project'
      }

      app.openWindow(title, win_name, [feed_item.object_id])      
    }

    spinner.show();
    self.add(spinner);
  }
  
  return self;
}

module.exports = FeedWindow;