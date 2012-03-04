var url = "http://www.gwahir.com:3000/api/venues.json?event_id=5";
var table = Ti.UI.createTableView();
var tableData = [];
var i, row, title;
var venuesWin = Titanium.UI.currentWindow;
var venuesTab = Titanium.UI.currentTab;

var xhr = Ti.Network.createHTTPClient({
  onload: function(){  
    var json = JSON.parse(this.responseText);
    for (i = 0; i < json.venues.length; i++) {
      var venue = json.venues[i];
      var row = Ti.UI.createTableViewRow({
          height:'60dp'
      });      
      row.link = "venue.js";
      row.venue = venue;
      var name;           
      (venue.name.length >= 22) ? name = venue.name.substr(0,22) + "..." : name = venue.name;              
      var nameLabel = Ti.UI.createLabel({
        text:name,
        font:{fontSize:'24dp',fontWeight:'bold'},
        height:'auto',
        left:'10dp',
        top:'5dp',
        color:'#000',
        touchEnabled:false
      });

      row.add(nameLabel);
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
  var venue = e.rowData.venue;
  var venueWindow;
  if (e.rowData.link){
    venueWindow = Titanium.UI.createWindow({
      url:e.rowData.link,
      layout:'vertical',
      venue_id: venue.id,
      title: "Fringe Venue"
    });
  }
  venuesTab.open(venueWindow);
}
 
xhr.open("GET", url);
xhr.send();
venuesWin.add(table);
venuesWin.open();