function CatsWindow(title, containingTab) {
  
  var styles = require('modules/styles/styles') 
  var catStyles = require('modules/styles/cats')
  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Ti.UI.createTableView();
  var tableData = [];
  var i, row, title;
  var currentTab = Ti.UI.currentTab;

  self.load = function(){
    var url = "http://www.gwahir.com:3000/api/cats.json?event_id=7";

    var xhr = Ti.Network.createHTTPClient({
      onload: function(){  

        cats = JSON.parse(this.responseText).cats;

        for(i = 0; i < cats.length; i++){

          var cat = cats[i];

          var row = Ti.UI.createTableViewRow(catStyles.row);

          row.link = 'projects.js';
          row.cat = cat;
          (cat.name.length >= 30) ? name = cat.name.substr(0,30) + "..." : name = cat.name;  

          catStyles.nameLabel.text = name.toLowerCase(); 
          var nameLabel = Ti.UI.createLabel(catStyles.nameLabel);

          row.add(nameLabel);      
          tableData.push(row);
        }
        table.setData(tableData);
        self.add(table);
        spinner.hide();    
      },
      onerror: function(e) {
        Ti.API.debug("STATUS: " + this.status);
        Ti.API.debug("TEXT:   " + this.responseText);
        Ti.API.debug("ERROR:  " + e.error);
        alert('There was an error retrieving the remote data. Try again.');
      },
      timeout:6000
    });

    table.addEventListener('click', function(e){
      loadProjects(e);
    });

    function loadProjects(e, islongclick) { 
      var projectsObj = require('modules/pages/projects');
      var projectsWindow = new projectsObj(app.toTitleCase(e.rowData.cat.name), containingTab, 'cat');
      projectsWindow.cat_id = e.rowData.cat.id;
      containingTab.open(projectsWindow);
      projectsWindow.load();
    }

    xhr.open("GET", url);
    xhr.send();

    spinner.show();
    self.add(spinner);
  }

  return self;
}

module.exports = CatsWindow;