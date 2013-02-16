var app = require('modules/core');

function Images(object_id, mode, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).images);
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  if(mode == 'project'){
    url = Ti.App.api_url + 'project_images/' + object_id;
  }
  else{
   url = Ti.App.api_url + 'venue_images/' + object_id; 
  }
  
  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = Images;