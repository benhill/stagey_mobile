function Cats(callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).cats);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  var url = app.api_url + "cats.json?event_id=7";

  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = Cats;