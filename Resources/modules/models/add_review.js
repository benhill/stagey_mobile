var app = require('modules/core');

function AddReview(project_id, rating, body, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  url = Ti.App.api_url + 'add_review?email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword + '&project_id=' + project_id + '&body=' + body + '&rating=' + rating;
  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};

module.exports = AddReview;