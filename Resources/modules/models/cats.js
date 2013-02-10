var app = require('modules/core');

function Cats(callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).cats);
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  var url = app.api_url + "cats";
  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = Cats;