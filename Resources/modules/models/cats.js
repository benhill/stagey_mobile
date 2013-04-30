var app = require('modules/core');

function Cats(callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText).cats);
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  var url = Ti.App.api_url + "cats";
  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = Cats;