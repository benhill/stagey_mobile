var app = require('modules/core');

function MobileConfig(callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  var url = 'https://www.hollywoodfringe.org/api/mobile_config/1';
  try{
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send();}
  catch(e){};
};
 
module.exports = MobileConfig;