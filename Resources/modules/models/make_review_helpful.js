function MakeReviewHelpful(review_id, user_id, feedback, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(this.responseText);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  url = 'http://www.gwahir.com:3000/api/make_review_helpful/' + review_id + '?user_id=' + user_id + '&feedback=' + feedback
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = MakeReviewHelpful;