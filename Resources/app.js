Ti.UI.backgroundColor = '#dddddd';
 
var url = "http://www.gwahir.com:3000/api/projects.json";
var win = Ti.UI.createWindow();
var table = Ti.UI.createTableView();
var tableData = [];
var json, projects, project, i, row, nameLabel, nickLabel, title;
 
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
 
    json = JSON.parse(this.responseText);
    for (i = 0; i < json.projects.length; i++) {
        project = json.projects[i];
        row = Ti.UI.createTableViewRow({
            height:'60dp'
        });
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
 
xhr.open("GET", url);
xhr.send();
 
win.add(table);
win.open();