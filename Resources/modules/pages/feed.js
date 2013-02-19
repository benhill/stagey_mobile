function FeedWindow(){

  var app = require('modules/core');  
  var styles = require('modules/styles/styles') 
  var feedStyles = require('modules/styles/feed')  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var page = 1;
  var rows_per_page = 8;
  var feedObj;
  var total_results;
  var table = Ti.UI.createTableView(feedStyles.table);
  var lastDistance = 0;
  var updating = false;
  var lastRow = rows_per_page;

  self.load = function(){    

    self.add(spinner);
    spinner.show();
    
    var feedObj = require('modules/models/feed');
    new feedObj(null, function(feed_items){
      if(feed_items.length > 0){
        total_results = feed_items[0].total_results;
        loadForm(feed_items);
      }
      else{
        noDataLabel = Ti.UI.createLabel(styles.noDataLabel);
        noDataLabel.text = "No feed data to display...";
        self.add(noDataLabel);
        spinner.hide();
      }
    });

    function loadForm(feed_items){
      var tableData = [];
      for(i = 0; i < feed_items.length; i++){
        row = createRow(feed_items[i]);
        tableData.push(row);        
      }
      
      table.setData(tableData);
      self.add(table);

      spinner.hide();
      var loadingRow = Ti.UI.createTableViewRow({title:"Loading...", color:'black'});   
      
      function beginUpdate(){          
        if(feed_items[0].total_results > (page * rows_per_page)){
          page += 1;
          updating = true;

          table.appendRow(loadingRow);
          
          new feedObj(page, function(feed_items){
            var rows = [];
            for (var i = 0; i < feed_items.length; i++){
              row = createRow(feed_items[i]);
              rows.push(row);              
            }            
            endUpdate(rows);
          });
        }
      }

      function endUpdate(rows){
        updating = false;        
        table.appendRow(rows);
        table.deleteRow(lastRow);
        lastRow += rows_per_page;
      }

      table.addEventListener('scroll',function(e){
        app.dynamic_scoller(e, beginUpdate, updating, lastDistance, page)
      });
    }

    
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
      else if(feed_item.object_type == 'Page'){
        var win_name = 'page';
        var title = 'Page';
      }

      app.openWindow(self, title, win_name, [feed_item.object_id]);
    }

    spinner.show();
    self.add(spinner);

    function createRow(feed_item){
      var row = Ti.UI.createTableViewRow(feedStyles.row);

      var baseImage = Ti.UI.createImageView(feedStyles.baseImage);
      baseImage.image = feed_item.item_image_path;
      row.add(baseImage);
                
      var labelView = Ti.UI.createView(feedStyles.labelView);
      labelView.feed_item = feed_item;
  
      (feed_item.object_name.length >= 30) ? title = feed_item.object_name.substr(0,30) + "..." : title = feed_item.object_name;
      var objectLabel = Ti.UI.createLabel(feedStyles.objectLabel);      
      objectLabel.text = title;
      objectLabel.feed_item = feed_item;
      labelView.add(objectLabel);

      var textLabel = Ti.UI.createLabel(feedStyles.textLabel);
      textLabel.text = feed_item.text + '...';
      textLabel.feed_item = feed_item;
      labelView.add(textLabel);

      var carrotImage = Ti.UI.createImageView(feedStyles.carrotImage);
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      carrotImage.feed_item = feed_item;
      labelView.add(carrotImage);

      row.add(labelView);

      var line = Ti.UI.createView(feedStyles.line);
      row.add(line);      

      labelView.addEventListener('click', function(e){  
        loadWindow(e);
      });

      return row;
    }
  }
  
  return self;
}

module.exports = FeedWindow;