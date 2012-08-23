Ti.include("helper.js");
var table = Titanium.UI.createTableView();
var tableData = [];
var i, row, title;
var currentWin = Ti.UI.currentWindow;
var currentTab = Ti.UI.currentTab;
var url = "http://www.gwahir.com:3000/api/cats.json?event_id=7";
currentWin.open();
var xhr = Ti.Network.createHTTPClient({
  onload: function(){  
    cats = JSON.parse(this.responseText).cats;
    for(i = 0; i < cats.length; i++){
      var cat = cats[i];
      var row = Ti.UI.createTableViewRow({
          height:45
      });
      row.link = 'projects.js';
      row.cat = cat;
      (cat.name.length >= 30) ? name = cat.name.substr(0,30) + "..." : name = cat.name;  
      var nameLabel = Ti.UI.createLabel({
        text:name.toLowerCase(),
        font:{fontSize:18},
        height:'auto',
        left:10,
        top:10,
        color:'#000',
        touchEnabled:false
      });
      row.add(nameLabel);      
      tableData.push(row);
    }
    table.setData(tableData);
    currentWin.add(table);
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
  var cat = e.rowData.cat;
  if (e.rowData.link){
    var newWindow = Titanium.UI.createWindow({
      url:e.rowData.link,
      cat_id:cat.id,
      title: cat.name,
      barColor:barColor
    });
  }
  currentTab.open(newWindow);
}
xhr.open("GET", url);
xhr.send();
spinner.show();
currentWin.add(spinner);
currentWin.open();