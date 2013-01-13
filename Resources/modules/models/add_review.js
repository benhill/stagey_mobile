var app = require('modules/core');

function AddReview(project_id, rating, body, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  url = app.api_url + 'add_review?email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword + '&project_id=' + project_id + '&body=' + body + '&rating=' + rating;
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = AddReview;