Ti.include("helper.js");
var venueWin = Titanium.UI.currentWindow;
var venuesTab = Titanium.UI.currentTab;
var url = "http://www.gwahir.com:3000/api/venue/" + venueWin.venue_id + ".json?event_id=8";
var json, venue;
var image_top = 0;
var image_place = 0;
var xhr = Ti.Network.createHTTPClient({
  onload: function(){     
    var venueScroll = Titanium.UI.createScrollView({
      contentWidth:'95%',
      contentHeight:1100,
      top:5,
      left:0,
      height:800,
      showVerticalScrollIndicator:true,
      showHorizontalScrollIndicator:true,
      layout:'vertical'
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

    var galleryView = Ti.UI.createView({
      height:'auto',
      width:'auto',
      top:5,
      left:5   
    });    
    var imageCollection = venue.images.slice(0,4);
    for (var i = 0; i < imageCollection.length; i++) {      
      if(i > 0 && i % 6 === 0){image_place = 0;image_top += 50;}
      var img = Ti.UI.createImageView({
        maxZoomScale:5,
        image: venue.images[i].thumbnail_path,
        width:70,
        height:70,
        left: image_place * 77,
        top: image_top,
        layout:'absolute',
        full_image_path: venue.images[i].image_path,
        borderRadius:10,
        borderWidth:0
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
    var moreImagesLabel = Ti.UI.createLabel({
      top:9,
      left:220,
      text:'more images',
      width:'auto',
      height:'auto',
      font:{fontSize:14}
    });
    if(venue.images.length > 4){
      venueScroll.add(moreImagesLabel);
      moreImagesLabel.addEventListener('click', function(e){
        galleryWin = Ti.UI.createWindow({
          images:venue.images,
          title:venue.title,
          backgroundColor:'white',
          url:'gallery.js',
          barColor:barColor
        });
        venuesTab.open(galleryWin);
      });
    }
    var description = Ti.UI.createLabel({
      text: venue.description,
      top:10,
      left:5,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    venueScroll.add(description);

    var line = Ti.UI.createView({
      width:320,
      height:1,
      top:10,
      bottom:5,
      backgroundColor:'gray'
    });
    venueScroll.add(line);
    var mapView = Ti.UI.createView({      
      width:320,
      height:40,
      top:5
    });
    var mapLabel = Ti.UI.createLabel({
      text: "map",
      top:3,
      left:5,
      font:{fontSize:13},
      height:'auto',
      width: '95%'
    });
    mapView.add(mapLabel);
    var address = Ti.UI.createLabel({
      text: venue.address + "\n" + venue.city + ", " + venue.state + " " + venue.postal,
      top:3,
      left:70,
      font:{fontSize:10},
      height:'auto',
      width: '95%'
    });
    mapView.add(address);
    venueScroll.add(mapView);
    mapView.addEventListener('click', function(e){
      var mapWin = Titanium.UI.createWindow({
        backgroundColor:'white',        
        url:'map.js',
        venue:venue
      });              
      venuesTab.open(mapWin);
    });
    var line = Ti.UI.createView({
      width:320,
      height:1,
      top:5,
      bottom:5,
      backgroundColor:'gray'
    });
    venueScroll.add(line);
    if(venue.number_of_shows > 0){
      var projectsView = Ti.UI.createView({      
        width:320,
        height:60,
        top:5
      });
      var projectThumb = Ti.UI.createImageView({
        width:50,
        height:50,
        image:venue.random_show_image_url,
        left:5,
        top:8,
        borderWidth:1,
        borderColor:'black'
      });
      projectsView.add(projectThumb);
      var projectLabel = Ti.UI.createLabel({
        text:"View " + venue.number_of_shows + " Shows at " + venue.name,
        font:{fontSize:14},
        left:65,
        top:5,
        height:'auto',
        width:'90%'
      });
      projectsView.add(projectLabel);
      var titleLabel = Ti.UI.createLabel({
        text:'including ' + venue.random_show_title,
        font:{fontSize:10},
        left:65,
        top:23,
        height:'auto',
        width:250
      });
      projectsView.add(titleLabel);
      venueScroll.add(projectsView);
      projectsView.addEventListener('click', function(e){
        var projectsWin = Titanium.UI.createWindow({
          backgroundColor:'white',        
          url:'projects.js',
          venue_id:venue.id
        });        
        venuesTab.open(projectsWin);
      });
      var line = Ti.UI.createView({
        width:320,
        height:1,
        top:10,
        bottom:10,
        backgroundColor:'gray'
      });
      venueScroll.add(line);
    }
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