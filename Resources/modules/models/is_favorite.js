var app = require('modules/core');

function IsFavorite(user_id, project_id, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  url = Ti.App.api_url + "is_favorite/?project_id=" + project_id + "&user_id=" + user_id;

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = IsFavorite;