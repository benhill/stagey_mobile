Ti.UI.backgroundColor = '#dddddd';
 
var url = "http://www.gwahir.com:3000/api/projects.json?event_id=5";
var table = Ti.UI.createTableView();
var tableData = [];
var json, projects, i, row, nameLabel, nickLabel, title;
var tabGroup = Titanium.UI.createTabGroup(); 
  
var win = Ti.UI.createWindow({
    title:'Projects',
    backgroundColor:'#fff'
});
  
var projectsTab = Titanium.UI.createTab({
  icon:'projectsTabicon.png',
  title:'Projects',
  window:win
});

var win2 = Titanium.UI.createWindow({
    title:'Venues',
    backgroundColor:'#fff'
});

var venuesTab = Titanium.UI.createTab({
    icon:'venuesTabicon.png',
    title:'Venues',
    window:win2
});

tabGroup.addTab(projectsTab);
tabGroup.addTab(venuesTab);
tabGroup.open();
  
var xhr = Ti.Network.createHTTPClient({
  onload: function(){  
    json = JSON.parse(this.responseText);
    for (i = 0; i < json.projects.length; i++) {
      project = json.projects[i];
      row = Ti.UI.createTableViewRow({
          height:'60dp'
      });
      row.link = "project.js";
      row.project = project;
      (project.title.length >= 22) ? title = project.title.substr(0,22) + "..." : title = project.title;  
      nameLabel = Ti.UI.createLabel({
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
      nickLabel = Ti.UI.createLabel({
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
      row.add(nickLabel);
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
  project = e.rowData.project;
  if (e.rowData.link){
    newWindow = Titanium.UI.createWindow({
      url:e.rowData.link,
      project_id: project.id,
      title: project.cat_name
    });
  }
  projectsTab.open(newWindow);
}
 
xhr.open("GET", url);
xhr.send();
win.add(table);
win.open();