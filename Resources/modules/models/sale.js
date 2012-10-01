function SaleModel(sale_id, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(){ 
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  };

  var url = app.api_url + "sale/" + sale_id + '.json';
  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = SaleModel;