Ti.include("helper.js");
function Icon(text, image, window){
   this.text = text;
   this.image = image;
   this.window = window;   
}
icons = [];
var whats_next = new Icon('Next Up', 'icons/whats_next_48.png', 'whats_next.js');
icons.push(whats_next);
var nearby = new Icon('Nearby', 'icons/nearby_48.png', 'icons/nearby.js');
icons.push(nearby);
var projects = new Icon('All Shows', 'icons/all_shows_48.png', 'projects.js');
icons.push(projects);
var venues = new Icon('Venues', 'icons/venues_48.png', 'projects.js');
icons.push(venues);
var profile = new Icon('Reviews', 'icons/reviews_48.png', 'projects.js');
icons.push(profile);
var profile = new Icon('Favorites', 'icons/favorites_48.png', 'projects.js');
icons.push(profile);
var profile = new Icon('My Schedule', 'icons/schedule_48.png', 'projects.js');
icons.push(profile);
var profile = new Icon('Purchases', 'icons/purchase_48.png', 'projects.js');
icons.push(profile);
var profile = new Icon('Me', 'icons/my_account_48.png', 'projects.js');
icons.push(profile);
var homeWin = Ti.UI.currentWindow;
var searchView = Ti.UI.createView({
  top:0,
  left:0,
  height:50,
  layout:'absolute'
});
var searchField = Titanium.UI.createTextField({
  value:'search for a show',
  height:30,
  clearOnEdit:true,
  top:10,
  left:5,
  width:'80%',
  borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
addKeyboardToolbar(searchField);
searchView.add(searchField);
var searchButton =  Ti.UI.createImageView({
  image:'icons/search_24.png',
  width:24,
  height:24,
  top:12,    
  left:270
});
searchView.add(searchButton);
searchButton.addEventListener('click', function(e){  
  var url = "http://www.gwahir.com:3000/api/search_projects.json?search_terms=" + searchField.value;
  xhr.open("GET", url);
  xhr.send();
});

var xhr = Ti.Network.createHTTPClient({
  onload: function(){     
    projects = JSON.parse(this.responseText).projects;
    projectsWin = Titanium.UI.createWindow({
      url:'projects.js',      
      projects: projects
    });
    searchWin.activeTab.open(projectsWin);
  },
  onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
  },
  timeout:5000
})
homeWin.add(searchView);
var iconsView = Ti.UI.createView({
  top:0,
  left:0,
  height:260,
  layout:'absolute'
});
var top = 0;
var left = 0;
for(var i = 0;i < icons.length; i++){
  if(i > 0 && i % 3 === 0){left = 0;top += 85;}
  icon = icons[i];
  var iconView = Ti.UI.createView({
    top:top,
    left:left,
    width:100,
    height:85,
    layout:'vertical'
  });  
  var iconImage = Ti.UI.createImageView({
    image:icon.image,
    height:40,
    width:40,
    top:10
  });
  iconView.add(iconImage);
  var iconText = Ti.UI.createLabel({
    text:icon.text,
    height:'auto',
    width:100,
    font:{fontSize:12},
    left:0,
    top:5,
    textAlign:'center'
  });
  iconView.add(iconText);  
  iconsView.add(iconView);
  left += 100;  
}
homeWin.add(iconsView);
var url = "http://www.gwahir.com:3000/api/mobile_ad.json";
var xhr = Ti.Network.createHTTPClient({
  onload: function(){
    var ad = JSON.parse(this.responseText);
    var adView = Ti.UI.createView({  
      top:0,
      left:0,
      height:100,
      layout:'absolute',
      backgroundColor:'gray'
    });
    var adImage = Ti.UI.createImageView({
      image:ad.image_url,      
      width:50,
      height:50,
      borderRadius:10,
      borderWidth:0,
      left:5,
      top:0
    });
    adView.add(adImage);
    var adText = Ti.UI.createLabel({
      text:ad.text,
      height:'auto',
      width:'auto',
      font:{fontSize:20},
      left:70,
      top:10
    });
    adView.add(adText);
    homeWin.add(adView);
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