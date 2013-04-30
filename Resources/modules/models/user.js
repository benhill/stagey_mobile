var app = require('modules/core');

function User(user_id, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  var url = Ti.App.api_url + "user/" + user_id;

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = User;