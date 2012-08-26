Ti.include("helper.js");
var url = "http://www.gwahir.com:3000/api/performances/7.json";
var nowWin = Titanium.UI.currentWindow;
var nowTab = Titanium.UI.currentTab;
var table = Titanium.UI.createTableView();
var page = 1
var rows_per_page = 9
var xhr = Ti.Network.createHTTPClient({
  onload: function(){  
    var tableData = [];
    var performances = JSON.parse(this.responseText).performances;
    for (var i = 0; i < performances.length; i++) {
      var performance = performances[i];
      var row = Ti.UI.createTableViewRow({
        height:60
      });
      row.project_id = performance.project_id;      
      var projectThumb = Titanium.UI.createImageView({
        image:performance.project_thumbnail,
        width:45,
        height:45,
        left:5,
        top:10,
        borderColor:'black',
        borderWidth:1,
        project_id:performance.project_id
      });      
      row.add(projectThumb);            
      var title;
      (performance.project_name.length >= 30) ? title = performance.project_name.substr(0,30) + "..." : title = performance.project_name;  
      var projectTitle = Titanium.UI.createLabel({
        text:title,
        height:Ti.UI.SIZE,
        width:Ti.UI.SIZE,
        top:10,
        left:60,
        font:{fontSize:14},
        project_id:performance.project_id
      });      
      row.add(projectTitle);      
      var projectInfo = Ti.UI.createLabel({
        text:performance.info,
        height:Ti.UI.SIZE,
        width:Ti.UI.SIZE,
        top:30,       
        left:60,
        font:{fontSize:10},
        project_id:performance.project_id
      });
      row.add(projectInfo);
      row.addEventListener('click', function(e){
        loadProject(e);
      });
      tableData.push(row);      
    }
    var row = Ti.UI.createTableViewRow({
      height:60
    });
    var moreLabel = Ti.UI.createLabel({
      text:"LOAD MORE",
      height:Ti.UI.SIZE,
      width:Ti.UI.SIZE,            
      top:20,        
      left:100,
      font:{fontSize:14, fontWeight:'bold'}
    });
    row.add(moreLabel);
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
      nowWin.add(table);
    }    
    nowWin.open();
    spinner.hide();
  },
  onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
});
function loadProject(e, islongclick) {
  var newWindow = Titanium.UI.createWindow({
    url:"project.js",
    layout:'vertical',
    project_id:e.source.project_id,
    barColor:barColor
  });
  nowTab.open(newWindow)  
}
function loadMore(e,islongclick){
  table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})
  var row = Ti.UI.createTableViewRow({
    height:60
  });
  var spinner = Ti.UI.createActivityIndicator({
    width:50,
    height:50,      
    message: 'loading...',
    color: 'black',
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
  })
  row.add(spinner);
  spinner.show();
  table.appendRow(row);
  table.scrollToIndex((page * rows_per_page) - rows_per_page);
  url = "http://www.gwahir.com:3000/api/performances/7.json?page=" + page;
  xhr.open("GET", url);
  xhr.send();
}
nowWin.add(spinner);
spinner.show();
xhr.open("GET", url);
xhr.send();