function PerformancesWindow(title, containingTab, mode){

  var styles = require('modules/styles/styles');
  var nowStyles = require('modules/styles/now');
  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var performancesObj = require('modules/models/performances');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);  
  var nowTab = Ti.UI.currentTab;
  var table = Ti.UI.createTableView();
  var page = 1
  var rows_per_page = 9
  var lat,lng;  

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
        var noPerfs = Ti.UI.createLabel(nowStyles.noPerfs);
        spinner.hide();
        self.add(noPerfs);
      }
    });

    function loadPerformances(performances){      
      var tableData = [];
      var total_results = performances[0].total_results;

      for (var i = 0; i < performances.length; i++) {

        var performance = performances[i];

        var row = Ti.UI.createTableViewRow(nowStyles.row);

        row.performance = performance;

        var projectThumb = Ti.UI.createImageView(nowStyles.projectThumb);
        projectThumb.image = performance.project_thumbnail;
        projectThumb.performance = performance;
        row.add(projectThumb);            

        var title;
        (performance.project_name.length >= 30) ? title = performance.project_name.substr(0,30) + "..." : title = performance.project_name;

        var projectTitle = Ti.UI.createLabel(nowStyles.projectTitle);
        projectTitle.text = title;
        projectTitle.performance = performance;
        row.add(projectTitle);

        var projectInfo = Ti.UI.createLabel(nowStyles.projectInfo);
        projectInfo.text = performance.info;
        projectInfo.performance = performance;
        row.add(projectInfo);

        row.addEventListener('click', function(e){
          if(mode == 'schedule'){
            var projectObj = require('modules/pages/project');            
            var projectWindow = new projectObj('Project', containingTab, e.source.performance.project_id);
            projectWindow.layout = 'vertical';
            containingTab.open(projectWindow);
            projectWindow.load();
          }            
          else{loadPerformance(e);}
        });

        tableData.push(row);
      }

      var row = Ti.UI.createTableViewRow(nowStyles.row);

      var moreLabel = Ti.UI.createLabel(nowStyles.moreLabel);
      
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

      if(e.source.performance.pwyc){
        var pwycObj = require('modules/pages/pwyc');
        var nextWindow = new pwycObj('PWYC', containingTab, e.source.performance);
      }
      else{
        var perfObj = require('modules/pages/performance');
        var nextWindow = new perfObj('Performance', containingTab, e.source.performance.id)
      }

      if(Ti.App.currentUser){
        containingTab.open(nextWindow);
        nextWindow.load();   
      }   
      else{
        var loginObj = require('modules/pages/login');
        var loginWindow = new loginObj('Login', containingTab, nextWindow);
        containingTab.open(loginWindow);
      }
      
    }

    function loadMore(e,islongclick){
      table.deleteRow(rows_per_page * (page-1),{animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE})
      var row = Ti.UI.createTableViewRow(nowStyles.row);

      var spinner = Ti.UI.createActivityIndicator(nowStyles.spinner);
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
      url = app.api_url + 'performances/7.json?';
    }
    else if(mode == 'nearby'){      
      url = app.api_url + 'performances/7.json?lat=' + lat + '&lng=' + lng + '&distance=0.5&';
    }
    else if(mode == 'schedule'){
      url = app.api_url + 'my_schedule.json?email=' + Ti.App.currentUser.email + '&password=' + Ti.App.userPassword + '&';
    }
    else{
      url = app.api_url + 'performances/7.json?project_id=' + mode.id + '&';
    }

    url += 'user_id=' + Ti.App.currentUser.id;

    return url
  }

  return self;
}

module.exports = PerformancesWindow;