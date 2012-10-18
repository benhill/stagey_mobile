function CatsWindow(){
  
  var styles = require('modules/styles/styles') 
  var catStyles = require('modules/styles/cats')    
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Ti.UI.createTableView(catStyles.table);
  var tableData = [];
  var i, row, title;
  var currentTab = Ti.UI.currentTab;

  self.load = function(){    
    
    var catsObj = require('modules/models/cats');
    new catsObj(function(cats){
      for(i = 0; i < cats.length; i++){

        var cat = cats[i];

        var row = Ti.UI.createTableViewRow(catStyles.row);

        row.link = 'projects.js';
        row.cat = cat;
        (cat.name.length >= 30) ? name = cat.name.substr(0,30) + "..." : name = cat.name;  

        catStyles.nameLabel.text = name.toLowerCase(); 
        var nameLabel = Ti.UI.createLabel(catStyles.nameLabel);

        var carrotImage = Ti.UI.createImageView(catStyles.carrotImage);
        row.add(carrotImage);

        row.add(nameLabel);      
        tableData.push(row);
      }
      table.setData(tableData);
      self.add(table);
      spinner.hide();
    });

    table.addEventListener('click', function(e){
      loadProjects(e);
    });

    function loadProjects(e, islongclick) { 
      params = ['cat', null, e.rowData.cat.id];
      app.openWindow(app.toTitleCase(e.rowData.cat.name), 'projects', params);
    }

    spinner.show();
    self.add(spinner);    
  }

  return self;
}

module.exports = CatsWindow;