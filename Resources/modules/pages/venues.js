function VenuesWindow(title, containingTab){

  var styles = require('modules/styles/styles');
  var venueStyles = require('modules/styles/venues');

  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);  
  var table = Ti.UI.createTableView();
  var tableData = [];
  var venuesTab = Titanium.UI.currentTab;

  self.load = function(){
    var url = "http://www.gwahir.com:3000/api/venues.json?event_id=7";

    var xhr = Ti.Network.createHTTPClient({
      onload: function(){      
        var json = JSON.parse(this.responseText);    

        for (i = 0; i < json.venues.length; i++) {
          var venue = json.venues[i];
          var row = Ti.UI.createTableViewRow(venueStyles.row);      
          row.venue_id = venue.id;

          venueStyles.venueThumb.image = venue.thumbnail;
          var venueThumb = Titanium.UI.createImageView(venueStyles.venueThumb);

          var name;
          (venue.name.length >= 30) ? name = venue.name.substr(0,30) + "..." : name = venue.name;

          venueStyles.nameLabel.text = name;
          var nameLabel = Ti.UI.createLabel(venueStyles.nameLabel);

          venueStyles.addressLabel.text = venue.address;
          var addressLabel = Ti.UI.createLabel(venueStyles);

          row.add(venueThumb);
          row.add(nameLabel);
          row.add(addressLabel);
          tableData.push(row);
        }

        table.setData(tableData);
        self.add(table);
        spinner.hide();
      },
      onerror: function(e) {
        Ti.API.debug("STATUS: " + this.status);
        Ti.API.debug("TEXT:   " + this.responseText);
        Ti.API.debug("ERROR:  " + e.error);
        alert('There was an error retrieving the remote data. Try again.');
      },
      timeout:8000
    });

    table.addEventListener('click', function(e){
      openVenue(e);
    });

    function openVenue(e, islongclick) { 
      var venueObj = require('modules/pages/venue');
      var venueWindow = new venueObj('Venue', containingTab, e.source.venue_id);
      venueWindow.layout = 'vertical';
      containingTab.open(venueWindow);
    }

    xhr.open("GET", url);
    xhr.send();
    self.add(spinner);
    spinner.show();
  }

  return self;
}

module.exports = VenuesWindow;