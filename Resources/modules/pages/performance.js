function PerformanceWindow(performance_id){

  var styles = require('modules/styles/styles');
  var perfStyles = require('modules/styles/performance');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var table = Ti.UI.createTableView(perfStyles.table);
  var tableData = [];
  var perfView = Ti.UI.createView(perfStyles.perfView);

  self.load = function(){

    var perfObj = require('modules/models/performance');
    var url = app.api_url + "performance/" + performance_id + "?user_id=" + (Ti.App.currentUser ? Ti.App.currentUser.id : '');

    spinner.show();
    perfView.add(spinner);

    new perfObj(url, function(performance){

      perfView.remove(spinner);

      var titleView = Ti.UI.createView(styles.titleView);      

      (performance.project_title.length >= 25) ? title = performance.project_title.substr(0,25) + "..." : title = performance.project_title;

      var titleLabel = Ti.UI.createLabel(styles.titleLabel);
      titleLabel.text = title;
      titleView.add(titleLabel);

      var perfInfo = Ti.UI.createLabel(styles.subTitleLabel);
      perfInfo.text = performance.performance_info;
      perfInfo.bottom = 10;
      titleView.add(perfInfo);

      perfView.add(titleView);      

      var row = Ti.UI.createTableViewRow(perfStyles.row);
    
      var buyLabel = Ti.UI.createLabel(perfStyles.perfLabel);
      buyLabel.text = 'Buy Tickets';
      row.add(buyLabel);

      var carrotImage = Ti.UI.createImageView(perfStyles.carrotImage);      
      row.add(carrotImage);

      tableData.push(row);

      row.addEventListener('click', function(e){
        if(performance.pwyc){
          var window = 'pwyc';
          var title = 'PWYC';
          var params = [performance];
        }
        else{
          var window = 'quantity';
          var title = 'Quantity';
          var params = [performance.id];
        }

        if(Ti.App.currentUser){
          app.openWindow(title, window, params);
        }   
        else{        
          var newObj = require('modules/pages/' + window);
          var newWindow = newObj.apply(this, params);
          newWindow.navBarHidden = true;

          var headerObj = require('modules/common/header');
          newWindow.add(new headerObj(title, self));

          app.openWindow('Login', 'login', [newWindow]);
        }
      });

      var row = Ti.UI.createTableViewRow(perfStyles.row);
    
      var projectLabel = Ti.UI.createLabel(perfStyles.perfLabel);
      projectLabel.text = 'More Info';
      row.add(projectLabel);

      var carrotImage = Ti.UI.createImageView(perfStyles.carrotImage);      
      row.add(carrotImage);

      tableData.push(row);

      row.addEventListener('click', function(e){
        app.openWindow('Project', 'project', [performance.project_id])
      });

      var row = Ti.UI.createTableViewRow(perfStyles.row);
    
      var perfsLabel = Ti.UI.createLabel(perfStyles.perfLabel);
      perfsLabel.text = 'More Performances';
      row.add(perfsLabel);

      var carrotImage = Ti.UI.createImageView(perfStyles.carrotImage);      
      row.add(carrotImage);

      tableData.push(row);

      row.addEventListener('click', function(e){
        app.openWindow('Performances', 'performances', [performance.project_id])
      });

      var row = Ti.UI.createTableViewRow(perfStyles.row);
    
      var venueLabel = Ti.UI.createLabel(perfStyles.perfLabel);
      venueLabel.text = 'View Venue';
      row.add(venueLabel);

      var carrotImage = Ti.UI.createImageView(perfStyles.carrotImage);      
      row.add(carrotImage);

      tableData.push(row);

      row.addEventListener('click', function(e){
        app.openWindow('Venue', 'venue', [performance.venue_id])
      });

      table.setData(tableData);
      perfView.add(table);
      self.add(perfView);

    });

  }

  return self;

}

module.exports = PerformanceWindow;