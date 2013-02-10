var app = require('modules/core');

function Page(page_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  var url = app.api_url + "page/" + page_id;

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = Page;