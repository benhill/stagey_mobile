var app = require('modules/core');

function SaleModel(sale_id, callback){

  var xhr = Ti.Network.createHTTPClient({
    timeout:app.timeout, enableKeepAlive:false
  });

  xhr.onload = function(){
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(e){
    app.throwError(this, e);
  };

  var url = Ti.App.api_url + "sale/" + sale_id;

  try{
    xhr.open('POST', url);
    xhr.send({'token': Ti.App.token});}
  catch(e){};
};

module.exports = SaleModel;