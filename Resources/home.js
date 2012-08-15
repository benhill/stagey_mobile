function Icon(text, image, window){
   this.text = text;
   this.image = image;
   this.window = window;   
}
icons = [];
var nearby = new Icon('Nearby', 'image', 'neaby.js');
icons.push(nearby);
var projects = new Icon('Projects', 'image', 'projects.js');
icons.push(projects);
var venues = new Icon('Venues', 'image', 'projects.js');
icons.push(venues);
var profile = new Icon('Profile', 'image', 'projects.js');
icons.push(profile);

var homeWin = Ti.UI.currentWindow;
var searchView = Ti.UI.createView({
  top:0,
  left:0,
  height:50,
  layout:'absolute'
});
var searchField = Titanium.UI.createTextField({  
  height:35,
  top:10,
  left:5,
  width:'80%',
  borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
searchView.add(searchField);
var searchButton =  Ti.UI.createButton({
  top:10,  
  title:'GO',
  style:Ti.UI.iPhone.SystemButtonStyle.BORDERED,
  height:35,
  width: 40,
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
  if(i > 0 && i % 3 === 0){left = 0;top += 75;}
  icon = icons[i];
  var iconView = Ti.UI.createView({
    top:top,
    left:left,
    width:100,
    height:100,
    layout:'vertical'
  });
  var iconText = Ti.UI.createLabel({
    text:icon.text,
    height:'auto',
    width:'auto',
    font:{fontSize:20},
    left:5,
  });
  iconView.add(iconText);
  iconsView.add(iconView);
  left += 105;  
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