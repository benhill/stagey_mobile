var app = require('modules/core');

function VenueDistance(venue_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(this.responseText);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  Ti.Geolocation.getCurrentPosition(function(e){
    if(e.coords){
      var lat = e.coords.latitude;
      var lng = e.coords.longitude;
    }
    else{
      var lat = '34.090643';
      var lng = '-118.332067';
    }
    url = app.api_url + 'venue_distance/' + venue_id + '?lat=' + lat + '&lng=' + lng;
    xhr.open('GET', url);
    xhr.send();
  });

};
 
module.exports = VenueDistance;