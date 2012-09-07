function NowWindow(title, containingTab, mode){

  var styles = require('modules/styles/styles');
  var nowStyles = require('modules/styles/now');
  
  var self = Ti.UI.createWindow(styles.defaultWindow);
  self.title = title;
  var performancesObj = require('modules/models/performances');
  var spinner = Ti.UI.createActivityIndicator(styles.spinner);  
  var nowTab = Titanium.UI.currentTab;
  var table = Titanium.UI.createTableView();
  var page = 1
  var rows_per_page = 9

  self.load = function(){
    if(mode == 'next'){
      var url = "http://www.gwahir.com:3000/api/performances/7.json";
    }
    else if(mode == 'schedule'){
      var url = "http://www.gwahir.com:3000/api/my_schedule.json?email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword
    }

    new performancesObj(url, function(performances){
      loadPerformances(performances);
    });

    function loadPerformances(performances){
      var tableData = [];
      var total_results = performances[0].total_results;

      for (var i = 0; i < performances.length; i++) {

        var performance = performances[i];

        var row = Ti.UI.createTableViewRow(nowStyles.row);

        row.project_id = performance.project_id;      

        var projectThumb = Titanium.UI.createImageView(nowStyles.projectThumb);
        projectThumb.image = performance.project_thumbnail;
        projectThumb.project_id = performance.project_id;
        row.add(projectThumb);            

        var title;
        (performance.project_name.length >= 30) ? title = performance.project_name.substr(0,30) + "..." : title = performance.project_name;

        var projectTitle = Titanium.UI.createLabel(nowStyles.projectTitle);
        projectTitle.text = title;
        projectTitle.project_id = performance.project_id;
        row.add(projectTitle);

        var projectInfo = Ti.UI.createLabel(nowStyles.projectInfo);
        nowStyles.projectInfo.text = performance.info;
        nowStyles.projectInfo.project_id = performance.project_id;
        row.add(projectInfo);

        row.addEventListener('click', function(e){
          loadProject(e);
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

        table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})

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

    function loadProject(e, islongclick) {
      var projectObj = require('modules/pages/project');
      var projectWindow = new projectObj('Project', containingTab, e.source.project_id)
      projectWindow.layout = 'vertical'
      containingTab.open(projectWindow);
      projectWindow.load();
    }

    function loadMore(e,islongclick){

      table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})
      var row = Ti.UI.createTableViewRow(nowStyles.row);

      var spinner = Ti.UI.createActivityIndicator(nowStyles.spinner);
      row.add(spinner);
      spinner.show();

      table.appendRow(row);

      table.scrollToIndex((page * rows_per_page) - rows_per_page);

      if(mode == 'next'){
        var url = "http://www.gwahir.com:3000/api/performances/7.json";
      }
      else if(mode == 'schedule'){
        var url = "http://www.gwahir.com:3000/api/my_schedule.json?email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword
      }

      url += '&page=' + page;

      new performancesObj(url, function(performances){
        loadPerformances(performances);
      });
    }

    self.add(spinner);
    spinner.show();
  }

  return self;
}

module.exports = NowWindow;