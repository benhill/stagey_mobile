function Feed(callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).feed_items);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  url = app.api_url + "feed"
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = Feed;