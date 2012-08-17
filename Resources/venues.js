Ti.include("helper.js");
var url = "http://www.gwahir.com:3000/api/venues.json";
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
      var venueThumb = Titanium.UI.createImageView({
        image:venue.thumbnail,
        width:45,
        height:45,
        left:5,
        top:10,
        borderColor:'black',
        borderWidth:1
      });      
      var name;
      (venue.name.length >= 30) ? name = venue.name.substr(0,30) + "..." : name = venue.name;
      var nameLabel = Ti.UI.createLabel({
        text:name,
        font:{fontSize:16,fontWeight:'bold'},
        height:'auto',
        left:'55dp',
        top:10,
        color:'#000',
        touchEnabled:false
      });
      var addressLabel = Ti.UI.createLabel({
        text:venue.address,
        font:{fontSize:'12dp'},
        height:'auto',
        left:'55dp',
        top:30,
        color:'#000',
        touchEnabled:false
      });
      row.add(venueThumb);
      row.add(nameLabel);
      row.add(addressLabel);
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