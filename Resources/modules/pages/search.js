function SearchWindow(search_terms){

  var styles = require('modules/styles/styles');
  var searchStyles = require('modules/styles/search');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var searchObj = require('modules/models/search');

  self.load = function(){
  
    var xhr = Ti.Network.createHTTPClient({
      onload: function(){
        projects = JSON.parse(this.responseText).projects;
        app.open('Search Results', 'projects', [null, null, null, projects]);
      },
      onerror: function(e) {
        Ti.API.debug("STATUS: " + this.status);
        Ti.API.debug("TEXT:   " + this.responseText);
        Ti.API.debug("ERROR:  " + e.error);
        alert('There was an error retrieving the remote data. Try again.');
      },
      timeout:5000
    })

    var searchField = Titanium.UI.createTextField(searchStyles.searchField);

    searchField.addEventListener('return', function(e){
      runSearch(searchField.value);
    });
    self.add(searchField);

    var searchButton =  Ti.UI.createImageView(searchStyles.searchButton);
    self.add(searchButton);

    if(search_terms){
      searchField.value = search_terms;
      searchField.color = 'black';
      runSearch(search_terms);
    }

    searchButton.addEventListener('click', function(e){
      runSearch(searchField.value);
    });

    function runSearch(search_terms, e, islongclick){
      new searchObj(search_terms, function(data){
        loadResults(data);
      });
    }

    function loadResults(projects){      
      app.openWindow('Search Results', 'projects', [null, projects]);
    }
  }

  return(self);
}

module.exports = SearchWindow;