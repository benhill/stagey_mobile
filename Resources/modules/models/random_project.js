var app = require('modules/core');

function RandomProject(venue_id, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    //app.throwError(this, e);
  };

  var url = Ti.App.api_url + "random_project?venue_id=" + venue_id;

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = RandomProject;