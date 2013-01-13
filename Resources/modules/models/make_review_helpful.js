var app = require('modules/core');

function MakeReviewHelpful(review_id, user_id, feedback, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(this.responseText);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  url = app.api_url + 'make_review_helpful/' + review_id + '?user_id=' + user_id + '&feedback=' + feedback
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = MakeReviewHelpful;