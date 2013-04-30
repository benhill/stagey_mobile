var app = require('modules/core');

function Projects(url, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText).projects);
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = Projects;