var app = require('modules/core');

function Project(url, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
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
 
module.exports = Project;