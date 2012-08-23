Ti.include("helper.js");
var mapWin = Titanium.UI.currentWindow;
var mapTab = Titanium.UI.currentTab;
var venue = mapWin.venue
var annotations = [];
var coordinates;

function add_view(){
  var mapView = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: coordinates,
    animate:true,
    regionFit:true,
    userLocation:false,
    annotations: annotations
  });
  mapWin.add(mapView);
}

function createAnnotation(venue){  
  var viewButton = Ti.UI.createButton({
      title: 'view',
      height: 32,
      width: 64
  })

  viewButton.addEventListener('click', function(e){
    venueWindow = Titanium.UI.createWindow({
      url:'venue.js',
      layout:'vertical',
      venue_id: venue.id,
      backgroundColor: 'white',
      barColor:barColor
    });
    mapTab.open(venueWindow);
  });

  var annotation = Ti.Map.createAnnotation({
    latitude: venue.lat,
    longitude: venue.lng,
    title: venue.name,
    subtitle: venue.address,
    animate: true,
    pincolor:  Titanium.Map.ANNOTATION_PURPLE,
    leftView: viewButton
  })
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
  timeout:5000
});

mapWin.add(spinner);
spinner.show();

if(venue){
  annotations.push(createAnnotation(venue));
  coordinates = {latitude:venue.lat, longitude:venue.lng, latitudeDelta:0.01, longitudeDelta:0.01};
  add_view();  
}
else {
  var url = "http://www.gwahir.com:3000/api/venues.json?event_id=5";    
  xhr.open("GET", url);
  xhr.send();
}