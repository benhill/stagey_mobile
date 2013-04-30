var app = require('modules/core');

function Feed(page, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText).feed_items);
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  url = Ti.App.api_url + "feed"
  if(page){url += '?page=' + page};

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = Feed;