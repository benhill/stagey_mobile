function Feed(page, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).feed_items);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  url = app.api_url + "feed"
  if(page){url += '?page=' + page};
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = Feed;