function FeedWindow(){
  
  var styles = require('modules/styles/styles') 
  var feedStyles = require('modules/styles/feed')  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var page = 1;
  var rows_per_page = 8;
  var feedObj;
  var total_results;
  var table = Ti.UI.createTableView(feedStyles.table);

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
        var feed_item = feed_items[i]

        var row = Ti.UI.createTableViewRow(feedStyles.row);

        var baseImage = Ti.UI.createImageView(feedStyles.baseImage);
        baseImage.image = feed_item.item_image_path;

        var cropView = Ti.UI.createView(feedStyles.cropView);        
        cropView.add(baseImage);        
         
        var croppedImage = cropView.toImage();
         
        var imageView = Ti.UI.createImageView(feedStyles.imageView);
        imageView.image = croppedImage;

        row.add(imageView);
                  
        var labelView = Ti.UI.createView(feedStyles.labelView);
        labelView.feed_item = feed_item;
    
        (feed_item.object_name.length >= 30) ? title = feed_item.object_name.substr(0,30) + "..." : title = feed_item.object_name;
        var objectLabel = Ti.UI.createLabel(feedStyles.objectLabel);      
        objectLabel.text = title;
        objectLabel.feed_item = feed_item;
        labelView.add(objectLabel);

        var textLabel = Ti.UI.createLabel(feedStyles.textLabel);
        textLabel.text = feed_item.text;
        textLabel.feed_item = feed_item;
        labelView.add(textLabel);

        var carrotImage = Ti.UI.createImageView(feedStyles.carrotImage);
        carrotImage.feed_item = feed_item;
        labelView.add(carrotImage);

        row.add(labelView);

        var line = Ti.UI.createView(feedStyles.line);
        row.add(line);

        tableData.push(row);

        labelView.addEventListener('click', function(e){  
          loadWindow(e);
        });
      }

      var row = Ti.UI.createTableViewRow(feedStyles.moreRow);

      var moreLabel = Ti.UI.createLabel(feedStyles.moreLabel);
      
      if(total_results > (rows_per_page * page)){
        row.add(moreLabel);
      }

      row.addEventListener('click', function(e){
        page += 1;
        loadMore(e);
      });

      tableData.push(row);

      if(page > 1){

        table.deleteRow(rows_per_page * (page-1),{animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE})

        for(var i = 0; i < tableData.length; i++){
          table.appendRow(tableData[i]);
        }

        table.scrollToIndex((page * rows_per_page) - rows_per_page);
      }
      else {
        table.setData(tableData);
        self.add(table);
      }

      spinner.hide();      
    }

    function loadMore(e,islongclick){
      table.deleteRow(rows_per_page * (page-1),{animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE})
      var row = Ti.UI.createTableViewRow(feedStyles.moreRow);

      var spinner = Ti.UI.createActivityIndicator(feedStyles.spinner);
      row.add(spinner);
      spinner.show();

      table.appendRow(row);

      table.scrollToIndex((page * rows_per_page) - rows_per_page);        
      
      new feedObj(page, function(feed_items){
        loadForm(feed_items);
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

      app.openWindow(title, win_name, [feed_item.object_id]);
    }

    spinner.show();
    self.add(spinner);
  }
  
  return self;
}

module.exports = FeedWindow;