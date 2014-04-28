function PerformancesWindow(mode, schedule_page, title){

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
  var lastDistance = 0;
  var updating = false;
  var lastRow = rows_per_page;
  title && title == 'My Schedule' ? schedule_title = 'My Schedule' : schedule_title = 'Schedule'

  self.load = function(){
    if(mode == "nearby"){
      Ti.Geolocation.getCurrentPosition(function(e){
        if(e.coords){
          lat = e.coords.latitude;
          lng = e.coords.longitude;
        }
        else{
          lat = '34.090643';
          lng = '-118.332067';
        }
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

        var previousLabel = Ti.UI.createLabel(perfStyles.previousLabel);
        previousLabel.text = performances[0].previous_date;
        previousView.add(previousLabel);

        var spacer = Ti.UI.createView(perfStyles.spacer);
        spacer.right = 0;
        previousView.add(spacer);

        if(performances[0].has_less){
          titleView.add(previousView);

          previousView.addEventListener('click', function(e){
            loadLast();
          })

          if(Ti.Platform.name == 'iPhone OS'){
            self.addEventListener('swipe', function(e) {
              if (e.direction == 'right') {
                loadLast();
              }
            });
          }
        };

        var nextView = Ti.UI.createView(perfStyles.nextView);

        var nextLabel = Ti.UI.createLabel(perfStyles.nextLabel);
        nextLabel.text = performances[0].next_date;
        nextView.add(nextLabel);

        var spacer = Ti.UI.createView(perfStyles.spacer);
        spacer.left = 0;
        nextView.add(spacer);

        if(performances[0].has_more){
          titleView.add(nextView);

          nextView.addEventListener('click', function(e){
            loadNext();
          })

          if(Ti.Platform.name == 'iPhone OS'){
            self.addEventListener('swipe', function(e) {
              if (e.direction == 'left') {
                loadNext();
              }
            });
          }

        };

        self.add(titleView);

      }

      mode == 'schedule' || mode == 'next' ? table.top = 120 : table.top = 70;

      var tableData = [];
      var total_results = performances[0].total_results;

      for (var i = 0; i < performances.length; i++) {
        row = createRow(performances[i]);
        tableData.push(row);
      }

      function createRow(performance){

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

        var dateTimeInfo = Ti.UI.createLabel(perfStyles.dateTimeInfo);
        dateTimeInfo.text = performance.date_time_info;
        dateTimeInfo.performance = performance;
        row.add(dateTimeInfo);

        var venueInfo = Ti.UI.createLabel(perfStyles.venueInfo);
        venueInfo.text = performance.venue_name;
        if(mode == "schedule"){venueInfo.text += ' \u00B7 ' + performance.quantity + ' Tickets'};
        venueInfo.performance = performance;
        row.add(venueInfo);

        if(mode == 'next' || mode == 'nearby'){
          var descriptionLabel = Ti.UI.createLabel(perfStyles.descriptionLabel);
          descriptionLabel.performance = performance;
          descriptionLabel.text = performance.description.substr(0,150).replace(/(\r\n|\n|\r)/gm,"") + '...';
          row.add(descriptionLabel);
          row.height = 135;
        }
        else{
          row.height = 65
        }

        row.addEventListener('click', function(e){
          loadPerformance(e);
        });

        var carrotImage = Ti.UI.createImageView(perfStyles.carrotImage);
        carrotImage.performance = performance;
        carrotImage.image = 'http://stagey-mobile.s3.amazonaws.com/more-arrow.png';
        row.add(carrotImage);

        return row;
      }

      table.setData(tableData);
      self.add(table);

      var loadingRow = Ti.UI.createTableViewRow({title:"Loading...", color:'black'});

      function beginUpdate(){
        if(performances[0].total_results > (page * rows_per_page)){
          page += 1;
          updating = true;

          table.appendRow(loadingRow);

          url = getUrl() + '&page=' + page;

          new performancesObj(url, function(performances){
            var rows = [];
            for (var i = 0; i < performances.length; i++){
              row = createRow(performances[i]);
              rows.push(row);
            }
            endUpdate(rows);
          });
        }
      }

      function endUpdate(rows){
        updating = false;
        table.appendRow(rows);
        table.deleteRow(lastRow);
        lastRow += rows_per_page;
      }

      table.addEventListener('scroll',function(e){
        app.dynamic_scoller(e, beginUpdate, updating, lastDistance, page)
      });

      self.open();
      spinner.hide();
    };


    function loadNext(){
      app.openWindow(self, schedule_title, 'performances', [mode, schedule_page + 1, schedule_title]);
    }

    function loadLast(){
      app.openWindow(self, schedule_title, 'performances', [mode, schedule_page - 1, schedule_title]);
    }

    function loadPerformance(e, islongclick) {
      app.openWindow(self, 'Performance', 'performance', [e.source.performance.id]);
    }

    self.add(spinner);
    spinner.show();
  }

  function getUrl(){
    if(mode == 'next'){
      url = Ti.App.api_url + 'my_schedule?schedule_page=' + schedule_page + '&';
    }
    else if(mode == 'nearby'){
      url = Ti.App.api_url + 'performances/7?lat=' + lat + '&lng=' + lng + '&distance=1&';
    }
    else if(mode == 'schedule'){
      url = Ti.App.api_url + 'my_schedule?user_id=' + Ti.App.currentUser.id + '&schedule_page=' + schedule_page + '&';
    }
    else{
      url = Ti.App.api_url + 'performances/7?project_id=' + (mode.id || mode) + '&';
    }

    return url
  }

  return self;
}

module.exports = PerformancesWindow;