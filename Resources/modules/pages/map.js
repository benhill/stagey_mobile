function MapWindow(venue){

  var app = require('modules/core');
  var styles = require('modules/styles/styles')
  var mapStyles = require('modules/styles/map')
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var annotations = [];
  var coordinates;
  var Map = require('ti.map');

  self.load = function(){

    function add_view(){
      var mapView =  Map.createView();
      mapView.mapType =  Map.NORMAL_TYPE;
      mapView.annotations = annotations;
      mapView.region = coordinates;
      self.add(mapView);
    }

    function createAnnotation(venue){
      var viewButton = Ti.UI.createButton(mapStyles.viewButton);

      viewButton.addEventListener('click', function(e){
        app.openWindow(self, 'Venue', 'venue', [venue.id]);
      });

      var annotation = Map.createAnnotation(mapStyles.annotation);
      annotation.latitude = venue.lat;
      annotation.longitude = venue.lng;
      annotation.title = venue.name;
      annotation.subtitle = venue.address;
      annotation.leftView = viewButton;
      annotation.pincolor = Map.ANNOTATION_RED;

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
      var url = Ti.App.api_url + "venues";
      xhr.open("GET", url);
      xhr.send();
    }
  }

  return self;
}

module.exports = MapWindow;