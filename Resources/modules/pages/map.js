function MapWindow(title, containingTab, venue){

  var styles = require('modules/styles/styles')
  var mapStyles = require('modules/styles/map')
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var annotations = [];
  var coordinates;

  self.load = function(){

    function add_view(){
      var mapView = Titanium.Map.createView(mapStyles.mapView);
      mapView.annotations = annotations;
      mapView.region = coordinates;
      self.add(mapView);
    }

    function createAnnotation(venue){  
      var viewButton = Ti.UI.createButton(mapStyles.viewButton);

      viewButton.addEventListener('click', function(e){
        params = ['venue', containingTab, venue.id];
        app.openWindow('venue', containingTab, params);
      });

      var annotation = Ti.Map.createAnnotation(mapStyles.annotation);
      annotation.latitude = venue.lat;
      annotation.longitude = venue.lng;
      annotation.title = venue.name;
      annotation.subtitle = venue.address;
      annotation.leftView = viewButton;

      return annotation;
    }

    var xhr = Ti.Network.createHTTPClient({
      onload: function(){  
        var json = JSON.parse(this.responseText);    
        for (i = 0; i < json.venues.length; i++) {
          var venue = json.venues[i];
          annotations.push(createAnnotation(venue));
        }
        coordinates = {latitude:'34.090643', longitude:'-118.332067', latitudeDelta:0.018, longitudeDelta:0.018};
        add_view();
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

    self.add(spinner);
    spinner.show();
    if(venue){
      annotations.push(createAnnotation(venue));
      coordinates = {latitude:venue.lat, longitude:venue.lng, latitudeDelta:0.01, longitudeDelta:0.01};
      add_view();  
    }
    else {
      var url = app.api_url + "venues.json?event_id=5";    
      xhr.open("GET", url);
      xhr.send();
    }
  }

  return self;
}

module.exports = MapWindow;