var app = require('modules/core');

function Users(project_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).team);
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  var url = Ti.App.api_url + "team?project_id=" + project_id;

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = Users;