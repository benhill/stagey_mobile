function AddUser(email, first_name, last_name, password, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  url = app.api_url + 'add_user.json?first_name=' + first_name + '&last_name=' + last_name + '&email=' + email + '&password=' + password;
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = AddUser;