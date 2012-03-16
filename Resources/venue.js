var venueWin = Titanium.UI.currentWindow;
var venuesTab = Titanium.UI.currentTab;
var url = "http://www.gwahir.com:3000/api/venue/" + venueWin.venue_id + ".json";
var json, venue;
var image_top = 0;
var image_place = 0;
var xhr = Ti.Network.createHTTPClient({
  onload: function(){     
    venue = JSON.parse(this.responseText);
    var name = Titanium.UI.createLabel({
      text:venue.name,
      height:'auto',
      width:'auto',            
      font:{fontSize:20},
      left:5
    });    
    venueWin.add(name);
    var address = Ti.UI.createLabel({
      text: venue.address + ", " + venue.city + ", " + venue.state + " " + venue.postal,
      top:1,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    venueWin.add(address);
    var presenter = Ti.UI.createLabel({
      text: "presented by " + venue.presenter,
      top:0,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    if(venue.presenter){venueWin.add(presenter)};
    var galleryView = Ti.UI.createView({
      height:'auto',
      width:'auto',
      top:5,
      left:5   
    });
    var imageCollection = venue.images;        
    for (var i = 0; i < imageCollection.length; i++) {      
      if(i > 0 && i % 6 === 0){image_place = 0;image_top += 50;}
      var img = Ti.UI.createImageView({
        maxZoomScale:5,
        image: venue.images[i].thumbnail_path,
        width: 45,
        height: 45,
        left: image_place * 50,
        top: image_top,
        layout:'absolute',
        full_image_path: venue.images[i].image_path
      });
      image_place ++;
      galleryView.add(img);            
      img.addEventListener('click', function(e){
        var venueWin = Titanium.UI.createWindow({
          backgroundColor:'white',
          url: 'image.js',
          image: e.source.full_image_path
        });        
        venueWin.open();
      });
    }    
    venueWin.add(galleryView);
    var description = Ti.UI.createLabel({
      text: venue.description,
      top:5,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    venueWin.add(description);
    var projectsLabel = Ti.UI.createLabel({
      text: "view projects",
      top:5,
      left:5,
      font:{fontSize:16},
      height:'auto',
      width: '95%'
    });
    venueWin.add(projectsLabel);    
    projectsLabel.addEventListener('click', function(e){
      var projectsWin = Titanium.UI.createWindow({
        backgroundColor:'white',        
        url: 'projects.js',
        venue_id: venue.id
      });        
      venuesTab.open(projectsWin);
    });
    var mapLabel = Ti.UI.createLabel({
      text: "map",
      top:5,
      left:5,
      font:{fontSize:16},
      height:'auto',
      width: '95%'
    });
    venueWin.add(mapLabel);
    mapLabel.addEventListener('click', function(e){
      var mapWin = Titanium.UI.createWindow({
        backgroundColor:'white',
        venue_id: venue.id,
        url:'map.js',
        venue:venue
      });              
      venuesTab.open(mapWin);
    });
    venueWin.add(projectsLabel);    
    venueWin.open();    
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