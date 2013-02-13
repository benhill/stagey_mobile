var app = require('modules/core');

function AddUser(email, first_name, last_name, password, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  url = Ti.App.api_url + 'add_user?first_name=' + first_name + '&last_name=' + last_name + '&email=' + email + '&password=' + password;
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = AddUser;