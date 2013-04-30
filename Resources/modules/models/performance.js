var app = require('modules/core');

function Performance(url, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = Performance;