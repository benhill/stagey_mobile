function Cats(callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).cats);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  var url = app.api_url + "cats";

  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = Cats;