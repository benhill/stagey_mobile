function PerformancesWindow(mode, schedule_page){

  var app = require('modules/core');
  var styles = require('modules/styles/styles');
  var perfStyles = require('modules/styles/performances');
  var self = Ti.UI.createWindow(styles.defaultWindow);
  var performancesObj = require('modules/models/performances');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);
  var nowTab = Ti.UI.currentTab;  
  var page = 1;
  var rows_per_page = 9;
  var lat,lng;
  var table = Ti.UI.createTableView(perfStyles.table);

  self.load = function(){
    if(mode == "nearby"){
      Ti.Geolocation.getCurrentPosition(function(e){
        lat = e.coords.latitude;
        lng = e.coords.longitude;
        loadForm();
      });
    }
    else{
      loadForm();    
    }
  }

  function loadForm(){
    url = getUrl();

    new performancesObj(url, function(performances){
      if(performances.length > 0){
        loadPerformances(performances);
      }
      else{
        var noPerfs = Ti.UI.createLabel(perfStyles.noPerfs);
        spinner.hide();
        self.add(noPerfs);
      }
    });

    function loadPerformances(performances){

      if(schedule_page){
        var titleView = Ti.UI.createView(perfStyles.titleView);
        
        var titleLabel = Ti.UI.createLabel(perfStyles.titleLabel);
        titleLabel.text = performances[0].date_time;        
        titleView.add(titleLabel);        
      
        var previousView = Ti.UI.createView(perfStyles.previousView);

        var previousImage = Ti.UI.createImageView(perfStyles.previousImage);
        previousView.add(previousImage);

        var spacer = Ti.UI.createView(perfStyles.spacer);
        spacer.right = 0;
        previousView.add(spacer);

        if(performances[0].has_less){titleView.add(previousView)};

        previousView.addEventListener('click', function(e){
          app.openWindow('Schedule', 'performances', [mode, schedule_page -= 1]);
        })

        var nextView = Ti.UI.createView(perfStyles.nextView);

        var nextImage = Ti.UI.createImageView(perfStyles.nextImage);
        nextView.add(nextImage);

        var spacer = Ti.UI.createView(perfStyles.spacer);
        spacer.left = 0;
        nextView.add(spacer);

        if(performances[0].has_more){titleView.add(nextView)};

        nextView.addEventListener('click', function(e){
          app.openWindow('Schedule', 'performances', [mode, schedule_page += 1]);
        })

        self.add(titleView);
      }
      
      mode == 'schedule' || mode == 'next' ? table.top = 100 : table.top = 50;

      var tableData = [];
      var total_results = performances[0].total_results;

      for (var i = 0; i < performances.length; i++) {

        var performance = performances[i];

        var row = Ti.UI.createTableViewRow(perfStyles.row);
        row.performance = performance;

        var projectThumb = Ti.UI.createImageView(perfStyles.projectThumb);
        projectThumb.image = performance.project_thumbnail;
        projectThumb.performance = performance;
        row.add(projectThumb);

        var title;
        (performance.project_name.length >= 25) ? title = performance.project_name.substr(0,25) + "..." : title = performance.project_name;

        var projectTitle = Ti.UI.createLabel(perfStyles.projectTitle);
        projectTitle.text = title;
        projectTitle.performance = performance;
        row.add(projectTitle);

        var projectInfo = Ti.UI.createLabel(perfStyles.projectInfo);
        projectInfo.text = performance.info;
        if(mode == "schedule"){projectInfo.text += ' \u00B7 ' + performance.quantity + ' Tickets'};
        projectInfo.performance = performance;
        row.add(projectInfo);

        row.addEventListener('click', function(e){
          loadPerformance(e);
        });

        var carrotImage = Ti.UI.createImageView(perfStyles.carrotImage);
        carrotImage.performance = performance;
        row.add(carrotImage);

        tableData.push(row);
      }

      var row = Ti.UI.createTableViewRow(perfStyles.row);

      var moreLabel = Ti.UI.createLabel(perfStyles.moreLabel);
      
      if(total_results > (rows_per_page * page)){
        row.add(moreLabel);
      }

      row.addEventListener('click', function(e){
        page += 1;
        loadMore(e);
      });

      tableData.push(row);

      if(page > 1){

        table.deleteRow(rows_per_page * (page-1),{animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE})

        for(var i = 0; i < tableData.length; i++){
          table.appendRow(tableData[i]);
        }

        table.scrollToIndex((page * rows_per_page) - rows_per_page);
      }
      else {
        table.setData(tableData);
        self.add(table);
      } 

      self.open();
      spinner.hide();
    };

    function loadPerformance(e, islongclick) {      
      app.openWindow('Performance', 'performance', [e.source.performance.id]);
    }

    function loadMore(e,islongclick){
      table.deleteRow(rows_per_page * (page-1),{animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE})
      var row = Ti.UI.createTableViewRow(perfStyles.row);

      var spinner = Ti.UI.createActivityIndicator(perfStyles.spinner);
      row.add(spinner);
      spinner.show();

      table.appendRow(row);

      table.scrollToIndex((page * rows_per_page) - rows_per_page);

      url = getUrl() + '&page=' + page;

      new performancesObj(url, function(performances){
        loadPerformances(performances);
      });
    }

    self.add(spinner);
    spinner.show();
  }

  function getUrl(){
    if(mode == 'next'){
      url = app.api_url + 'my_schedule?schedule_page=' + schedule_page + '&';
    }
    else if(mode == 'nearby'){      
      url = app.api_url + 'performances/7?lat=' + lat + '&lng=' + lng + '&distance=50&';
    }
    else if(mode == 'schedule'){
      url = app.api_url + 'my_schedule?email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword + '&schedule_page=' + schedule_page + '&';
    }
    else{
      url = app.api_url + 'performances/7?project_id=' + (mode.id || mode) + '&';
    }

    if(Ti.App.currentUser){url += 'user_id=' + Ti.App.currentUser.id};

    return url
  }

  return self;
}

module.exports = PerformancesWindow;