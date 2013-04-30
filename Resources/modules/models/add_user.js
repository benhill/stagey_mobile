var app = require('modules/core');

function AddUser(email, first_name, last_name, password, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  url = Ti.App.secure_api_url + 'add_user?first_name=' + first_name + '&last_name=' + last_name;
  xhr.open('POST', url);
  xhr.send({"email": email, "password": password});
};

module.exports = AddUser;