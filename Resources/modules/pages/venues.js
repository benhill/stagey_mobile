function VenuesWindow(){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venues');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);  
  var venuesTab = Titanium.UI.currentTab;
  var contentView;
  var table;  
  var rows_per_page = 9  
  var lastDistance = 0;
  var updating = false;

  self.load = function(){

    var buttonBarView = Ti.UI.createView(venueStyles.buttonBarView);
    
    var buttonBarObj = require('modules/common/button_bar');
    buttonBarView.add(new buttonBarObj(['LIST', 'MAP'], function(label){

      if(self.children.length > 1){self.remove(contentView)};

      contentView = Ti.UI.createView(venueStyles.contentView);      
            
      if(label == 'LIST'){        
        loadVenues();
      }
      else if(label == 'MAP'){
        loadMap();
      }
    }));

    self.add(buttonBarView);

    function loadMap(){
      self.add(spinner);
      spinner.show();

      var mapObj = require('modules/common/map')
      contentView.add(new mapObj(null, function(){
        spinner.hide();
      }));
      self.add(contentView);      
    }
      
    function loadVenues(){
      var page = 1
      var lastRow = rows_per_page;

      self.add(spinner);
      spinner.show();

      table = Ti.UI.createTableView(venueStyles.table);
      var tableData = [];
      var venuesObj = require(app.resdir + 'modules/models/venues');
      new venuesObj(page, function(venues){      
        for (i = 0; i < venues.length; i++) {
          row = createRow(venues[i]);          
          tableData.push(row);
        }

        table.setData(tableData);
        contentView.add(table);
        self.add(contentView);
        spinner.hide();

        var loadingRow = Ti.UI.createTableViewRow({title:"Loading...", color:'black'});   
      
        function beginUpdate(){          
          if(venues[0].total_results > (page * rows_per_page)){
            page += 1;
            updating = true;

            table.appendRow(loadingRow);
            
            new venuesObj(page, function(venues){
              var rows = [];
              for (var i = 0; i < venues.length; i++){
                row = createRow(venues[i]);
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
      })

      table.addEventListener('click', function(e){
        openVenue(e);
      });
    }

    function createRow(venue){
      var row = Ti.UI.createTableViewRow(venueStyles.row);      
      row.venue_id = venue.id;

      var venueThumb = Titanium.UI.createImageView(venueStyles.venueThumb);
      venueThumb.image = venue.thumbnail;
      venueThumb.venue_id = venue.id;
      row.add(venueThumb);

      var name;
      (venue.name.length >= 25) ? name = venue.name.substr(0,25) + "..." : name = venue.name;
      var nameLabel = Ti.UI.createLabel(venueStyles.nameLabel);
      nameLabel.text = name;
      name.venue_id = venue.id;
      row.add(nameLabel);

      var addressLabel = Ti.UI.createLabel(venueStyles.addressLabel);
      addressLabel.text = venue.address;
      addressLabel.venue_id = venue.id;
      row.add(addressLabel);

      var carrotImage = Ti.UI.createImageView(venueStyles.carrotImage);
      carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
      carrotImage.venue_id = venue.id;

      row.add(carrotImage);
      row.venue_id = venue.id;

      return row;
    }

    function openVenue(e, islongclick) { 
      app.openWindow(self, 'Venue', 'venue', [e.source.venue_id]);
    }
        
  }

  return self;
}

module.exports = VenuesWindow;