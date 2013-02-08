var app = require('modules/core');

function Users(project_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).team);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  var url = app.api_url + "team?project_id=" + project_id;

  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = Users;