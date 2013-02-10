var app = require('modules/core');

function SearchModel(terms, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).projects);
  };

  xhr.onerror = function(e){ 
    app.throwError(this, e);
  };

  var url = app.api_url + "search_projects?search_terms=" + terms;

  try{
    xhr.open('GET', url);
    xhr.send();}
  catch(e){};
};
 
module.exports = SearchModel;