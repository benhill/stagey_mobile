function VenuesWindow(){

  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venues');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);  
  var venuesTab = Titanium.UI.currentTab;
  var contentView;
  var table;

  self.load = function(){

    var buttonBarView = Ti.UI.createView(venueStyles.buttonBarView);
    
    var buttonBarObj = require('modules/common/button_bar');
    buttonBarView.add(new buttonBarObj(['LIST', 'MAP'], function(label){

      if(self.children.length > 1){self.remove(contentView)};

      contentView = Ti.UI.createView(venueStyles.contentView);

      self.add(spinner);
      spinner.show();
            
      if(label == 'LIST'){        
        loadVenues();
      }
      else if(label == 'MAP'){
        loadMap();
      }
    }));

    self.add(buttonBarView);

    function loadMap(){
      var mapObj = require('modules/common/map')
      contentView.add(new mapObj());
      self.add(contentView);
      spinner.hide();
    }
      
    function loadVenues(){
      table = Ti.UI.createTableView(venueStyles.table);
      var tableData = [];
      var venuesObj = require('modules/models/venues');    
      new venuesObj(function(venues){      
        for (i = 0; i < venues.length; i++) {
          var venue = venues[i];
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
          carrotImage.venue_id = venue.id;

          row.add(carrotImage);
          row.venue_id = venue.id;
          tableData.push(row);
        }

        table.setData(tableData);
        contentView.add(table);
        self.add(contentView);
        spinner.hide();
      })
    }

    table.addEventListener('click', function(e){
      openVenue(e);
    });

    function openVenue(e, islongclick) { 
      app.openWindow('Venue', 'venue', [e.source.venue_id]);
    }
        
  }

  return self;
}

module.exports = VenuesWindow;