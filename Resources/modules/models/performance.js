function Performance(url, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText));
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  xhr.open('GET', url);
  xhr.send();
};
 
module.exports = Performance;