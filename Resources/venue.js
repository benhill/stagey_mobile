Ti.include("helper.js");
var venueWin = Titanium.UI.currentWindow;
var venuesTab = Titanium.UI.currentTab;
var url = "http://www.gwahir.com:3000/api/venue/" + venueWin.venue_id + ".json";
var json, venue;
var image_top = 0;
var image_place = 0;
var xhr = Ti.Network.createHTTPClient({
  onload: function(){     
    var venueScroll = Titanium.UI.createScrollView({
      contentWidth:'auto',
      contentHeight:1100,
      top:5,
      height:800,
      width:'95%',
      showVerticalScrollIndicator:true,
      showHorizontalScrollIndicator:true,
      layout:'vertical',
      left:0
    });
    venue = JSON.parse(this.responseText);
    var name = Titanium.UI.createLabel({
      text:venue.name,
      height:'auto',
      width:'auto',            
      font:{fontSize:20},
      left:5
    });    
    venueScroll.add(name);
    var presenter = Ti.UI.createLabel({
      text: "presented by " + venue.presenter,
      top:0,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    if(venue.presenter){venueScroll.add(presenter)};
    var address = Ti.UI.createLabel({
      text: venue.address + ", " + venue.city + ", " + venue.state + " " + venue.postal,
      top:1,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    venueScroll.add(address);
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
        var imageWin = Titanium.UI.createWindow({
          backgroundColor:'white',
          url: 'image.js',
          image: e.source.full_image_path
        });        
        imageWin.open();
      });
    }    
    venueScroll.add(galleryView);
    var description = Ti.UI.createLabel({
      text: venue.description,
      top:10,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    venueScroll.add(description);
    var projectsLabel = Ti.UI.createLabel({
      text: "view projects",
      top:20,
      left:5,
      font:{fontSize:16},
      height:'auto',
      width: '95%'
    });    
    venueScroll.add(projectsLabel);    
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
    venueScroll.add(mapLabel);
    mapLabel.addEventListener('click', function(e){
      var mapWin = Titanium.UI.createWindow({
        backgroundColor:'white',        
        url:'map.js',
        venue:venue
      });              
      venuesTab.open(mapWin);
    });    
    venueWin.add(venueScroll);
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