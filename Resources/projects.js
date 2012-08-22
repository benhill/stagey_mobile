Ti.include("helper.js");
var table = Titanium.UI.createTableView();
var tableData = [];
var i, row, title;
var projectsWin = Ti.UI.currentWindow;
var projectsTab = Ti.UI.currentTab;
if(projectsWin.venue_id){
  var url = "http://www.gwahir.com:3000/api/projects.json?venue_id=" + projectsWin.venue_id;
}
else {
  var url = "http://www.gwahir.com:3000/api/projects.json";
}
projectsWin.open();
var xhr = Ti.Network.createHTTPClient({
  onload: function(){  
    var projects;
    projectsWin.projects ? projects = projectsWin.projects : projects = JSON.parse(this.responseText).projects;
    for (i = 0; i < projects.length; i++){
      var project = projects[i];
      var row = Ti.UI.createTableViewRow({
          height:60
      });
      row.link = 'project.js';
      row.project = project;
      var projectThumb = Titanium.UI.createImageView({
        image:project.thumbnail,
        width:45,
        height:45,
        left:5,
        top:10,
        borderColor:'black',
        borderWidth:1
      });   
      row.add(projectThumb);         
      (project.title.length >= 30) ? title = project.title.substr(0,30) + "..." : title = project.title;  
      var nameLabel = Ti.UI.createLabel({
        text:title.toLowerCase(),
        font:{fontSize:16,fontWeight:'bold'},
        height:'auto',
        left:55,
        top:7,
        color:'#000',
        touchEnabled:false
      });
      row.add(nameLabel);
      var infoLabel = Ti.UI.createLabel({
        text:project.cat_name + " \u00B7 " + project.cost_range + " \u00B7 " + project.duration,
        font:{fontSize:12},
        height:'auto',
        left:55,
        top:25,
        color:'#000',
        touchEnabled:false
      });
      row.add(infoLabel);
      tableData.push(row);
    }
    table.setData(tableData);
    projectsWin.add(table);
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
  showClickEventInfo(e);
});
function showClickEventInfo(e, islongclick) { 
  var project = e.rowData.project;
  if (e.rowData.link){
    var newWindow = Titanium.UI.createWindow({
      url:e.rowData.link,
      project_id: project.id,
      title: project.cat_name,
      barColor:barColor
    });
  }
  projectsTab.open(newWindow);
}
xhr.open("GET", url);
xhr.send();
spinner.show();
projectsWin.add(spinner);
projectsWin.open();