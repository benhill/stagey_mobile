var app = require('modules/core');

function Venues(page, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).venues);
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  var url = Ti.App.api_url + "venues"
  if(page){url = url + "?page=" + page};

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = Venues;