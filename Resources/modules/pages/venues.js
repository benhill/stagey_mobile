function VenuesWindow(){

  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venues');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);  
  var table = Ti.UI.createTableView(venueStyles.table);
  var tableData = [];
  var venuesTab = Titanium.UI.currentTab;

  self.load = function(){

    var venuesObj = require('modules/models/venues');    
    new venuesObj(function(venues){      
      loadVenues(venues);      
    })

    function loadVenues(venues){
      for (i = 0; i < venues.length; i++) {
        var venue = venues[i];
        var row = Ti.UI.createTableViewRow(venueStyles.row);      
        row.venue_id = venue.id;

        var venueThumb = Titanium.UI.createImageView(venueStyles.venueThumb);
        venueThumb.image = venue.thumbnail;
        venueThumb.venue_id = venue.id;

        var name;
        (venue.name.length >= 30) ? name = venue.name.substr(0,30) + "..." : name = venue.name;
        var nameLabel = Ti.UI.createLabel(venueStyles.nameLabel);
        nameLabel.text = name;
        name.venue_id = venue.id;

        var addressLabel = Ti.UI.createLabel(venueStyles);
        addressLabel.addressLabel.text = venue.address;
        addressLabel.venue_id = venue.id;

        row.add(venueThumb);
        row.add(nameLabel);
        row.add(addressLabel);
        tableData.push(row);
      }

      table.setData(tableData);
      self.add(table);
      spinner.hide();
    }

    table.addEventListener('click', function(e){
      openVenue(e);
    });

    function openVenue(e, islongclick) { 
      app.openWindow('Venue', 'venue', [e.source.venue_id]);
    }
    
    self.add(spinner);
    spinner.show();
  }

  return self;
}

module.exports = VenuesWindow;