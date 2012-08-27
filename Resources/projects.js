Ti.include("helper.js");
var table = Titanium.UI.createTableView();
var i, row, title;
var currentWin = Ti.UI.currentWindow;
var currentTab = Ti.UI.currentTab;
var page = 1
var rows_per_page = 9
var seed;

if(currentWin.venue_id){
  var url = "http://www.gwahir.com:3000/api/projects.json?venue_id=" + currentWin.venue_id + "&event_id=7";
}
else if(currentWin.cat_id){
  var url = "http://www.gwahir.com:3000/api/projects.json?cat_id=" + currentWin.cat_id + "&event_id=7";
}
else if(currentWin.favorites){    
  var url = "http://www.gwahir.com:3000/api/favorites.json?email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword;
}
else {
  var url = "http://www.gwahir.com:3000/api/projects.json&event_id=7";
}
currentWin.open();
var xhr = Ti.Network.createHTTPClient({
  onload: function(){  
    var projects;
    var tableData = [];
    currentWin.projects ? projects = currentWin.projects : projects = JSON.parse(this.responseText).projects;
    if (projects.length > 0){
      var total_results = projects[0].total_results;
      var seed = projects[0].seed;
    }
    for(i = 0; i < projects.length; i++){
      var project = projects[i];      
      var row = Ti.UI.createTableViewRow({
          height:60
      });
      row.project_id = project.id;
      var projectThumb = Titanium.UI.createImageView({
        image:project.thumbnail,
        width:45,
        height:45,
        left:5,
        top:10,
        borderColor:'black',
        borderWidth:1,
        project_id:project.id
      });   
      row.add(projectThumb);         
      (project.title.length >= 30) ? title = project.title.substr(0,25) + "..." : title = project.title;  
      var nameLabel = Ti.UI.createLabel({
        text:title.toLowerCase(),
        font:{fontSize:16,fontWeight:'bold'},
        height:'auto',
        left:55,
        top:7,
        color:'#000',
        touchEnabled:false,
        project_id:project.id
      });
      row.add(nameLabel);
      var infoLabel = Ti.UI.createLabel({
        text:project.cat_name + " \u00B7 " + project.cost_range + " \u00B7 " + project.duration,
        font:{fontSize:12},
        height:'auto',
        left:55,
        top:25,
        color:'#000',
        touchEnabled:false,
        project_id:project.id
      });
      row.add(infoLabel);
      tableData.push(row);
      row.addEventListener('click', function(e){
        loadProject(e);
      });
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
    if(page * rows_per_page < total_results){
      tableData.push(row);
    }
    if(page > 1){      
      table.deleteRow(rows_per_page * (page-1),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE})
      for(var i = 0; i < tableData.length; i++){
        table.appendRow(tableData[i]);
      }
      table.scrollToIndex((page * rows_per_page) - rows_per_page);
    }
    else {
      table.setData(tableData);
      currentWin.add(table);
    }    
    spinner.hide();    
  },
  onerror: function(e){
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:6000
});
function loadProject(e, islongclick){
  var newWindow = Titanium.UI.createWindow({
    url:"project.js",
    layout:'vertical',
    project_id:e.source.project_id,
    barColor:barColor
  });
  currentTab.open(newWindow)  
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
  if(currentWin.venue_id){
    var url = "http://www.gwahir.com:3000/api/projects.json?venue_id=" + currentWin.venue_id + "&event_id=7&page=" + page;
  }
  else if(currentWin.cat_id){
    var url = "http://www.gwahir.com:3000/api/projects.json?cat_id=" + currentWin.cat_id + "&event_id=7&page=" + page;
  }
  else if(currentWin.favorites){
    var url = "http://www.gwahir.com:3000/api/favorites.json?email=" + Ti.App.currentUser.email + "&password=" + Ti.App.userPassword + "&page=" + page;
  }
  else {
    var url = "http://www.gwahir.com:3000/api/projects.json&event_id=7&page=" + page;
  }
  url += "&seed=" + seed;
  xhr.open("GET", url);
  xhr.send();
}
xhr.open("GET", url);
xhr.send();
spinner.show();
currentWin.add(spinner);
currentWin.open();