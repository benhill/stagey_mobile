var app = require('modules/core');

function Images(project_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).images);
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  url = Ti.App.api_url + 'project_images/' + project_id;
  
  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = Images;