function Projects(url, callback){
 
  var xhr = Ti.Network.createHTTPClient({
    timeout: 15000
  });

  xhr.onload = function(){    
    callback(JSON.parse(this.responseText).projects);
  };

  xhr.onerror = function(){ 
    Ti.API.info('Error');
  };

  xhr.open('GET', url);
  xhr.send();
 
};
 
module.exports = Projects;