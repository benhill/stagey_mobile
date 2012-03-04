var url = "http://www.gwahir.com:3000/api/projects.json?event_id=5";
var table = Ti.UI.createTableView();
var tableData = [];
var i, row, title;
var projectsWin = Titanium.UI.currentWindow;
var projectsTab = Titanium.UI.currentTab;

var xhr = Ti.Network.createHTTPClient({
  onload: function(){  
    var json = JSON.parse(this.responseText);
    for (i = 0; i < json.projects.length; i++) {
      var project = json.projects[i];
      var row = Ti.UI.createTableViewRow({
          height:'60dp'
      });
      row.link = "project.js";
      row.project = project;
      (project.title.length >= 22) ? title = project.title.substr(0,22) + "..." : title = project.title;  
      var nameLabel = Ti.UI.createLabel({
          text:title,
          font:{
              fontSize:'24dp',
              fontWeight:'bold'
      },
      height:'auto',
      left:'10dp',
      top:'5dp',
      color:'#000',
      touchEnabled:false
      });
      var catLabel = Ti.UI.createLabel({
      text:project.cat_name,
      font:{
          fontSize:'16dp'
      },
      height:'auto',
      left:'10dp',
      bottom:'5dp',
      color:'#000',
      touchEnabled:false
      });

      row.add(nameLabel);
      row.add(catLabel);
      tableData.push(row);
    }

    table.setData(tableData); 
  },
  onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
});

table.addEventListener('click', function(e){
  showClickEventInfo(e);
});

function showClickEventInfo(e, islongclick) { 
  var project = e.rowData.project;
  if (e.rowData.link){
    var newWindow = Titanium.UI.createWindow({
      url:e.rowData.link,
      layout:'vertical',
      project_id: project.id,
      title: project.cat_name
    });
  }
  projectsTab.open(newWindow);
}
 
xhr.open("GET", url);
xhr.send();
projectsWin.add(table);
projectsWin.open();