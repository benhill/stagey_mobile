function MapWindow(venue, callback){

  var app = require('modules/core');
  var styles = require('modules/styles/styles')
  var mapStyles = require('modules/styles/map')
  var annotations = [];
  var coordinates;
  var mapWrapper = Ti.UI.createView(mapStyles.mapWrapper);

  function add_view(){
    var mapView = Ti.Map.createView(mapStyles.mapView);
    mapView.annotations = annotations;
    mapView.region = coordinates;
    mapWrapper.add(mapView);    
  }

  function createAnnotation(venue){  
    var viewButton = Ti.UI.createButton(mapStyles.viewButton);

    viewButton.addEventListener('click', function(e){
      app.openWindow('Venue', 'venue', [venue.id]);
    });

    var annotation = Ti.Map.createAnnotation(mapStyles.annotation);
    annotation.latitude = venue.lat;
    annotation.longitude = venue.lng;
    annotation.title = venue.name;
    annotation.subtitle = venue.address;
    annotation.leftView = viewButton;

    return annotation;
  }

  if(venue){
    annotations.push(createAnnotation(venue));
    coordinates = {latitude:venue.lat, longitude:venue.lng, latitudeDelta:0.01, longitudeDelta:0.01};
    callback();
    add_view();  
  }
  else {
    var venuesObj = require('modules/models/venues');
    new venuesObj(function(venues){
      for (i = 0; i < venues.length; i++) {
        var venue = venues[i];
        annotations.push(createAnnotation(venue));
      }
      //TODO: Add these to event meta data
      coordinates = {latitude:'34.090643', longitude:'-118.332067', latitudeDelta:0.018, longitudeDelta:0.018};
      callback();
      add_view();
    });    
  }  

  return mapWrapper;
}

module.exports = MapWindow;