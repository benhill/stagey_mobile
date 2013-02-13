var app = require('modules/core');

function Alert(callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  var url = Ti.App.api_url + "alert"
  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = Alert;