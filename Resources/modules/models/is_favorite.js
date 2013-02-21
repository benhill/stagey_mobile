var app = require('modules/core');

function IsFavorite(email, project_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  url = Ti.App.api_url + "is_favorite/?project_id=" + project_id + "&email=" + email;

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = IsFavorite;