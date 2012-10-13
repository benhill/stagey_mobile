function User(user_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  var url = app.api_url + "user/" + user_id;
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = User;