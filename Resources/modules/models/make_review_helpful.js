var app = require('modules/core');

function MakeReviewHelpful(review_id, user_id, feedback, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(this.responseText);
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  url = Ti.App.api_url + 'make_review_helpful/' + review_id + '?user_id=' + user_id + '&feedback=' + feedback

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = MakeReviewHelpful;