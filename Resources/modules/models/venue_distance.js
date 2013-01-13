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
    url = app.api_url + 'venue_distance/' + venue_id + '?lat=' + e.coords.latitude + '&lng=' + e.coords.longitude;
    xhr.open('GET', url);
    xhr.send();
  });

};
 
module.exports = VenueDistance;